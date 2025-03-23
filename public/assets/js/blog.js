if (!localStorage.getItem('user')) location.href = '/auth'
else getElbyId('welcome-text').innerHTML = localStorage.getItem('user');

const hideLoader = () => getElbyId('loader-overlay').style.display = 'none';

const blogs = {
    blog: async (id) => {
        getElbyId("blog-body").innerHTML = renderBlog(await (await fetch(`/blogs/${id}`)).json())
    },
    loadAll: async () => {
        getElbyId('container').innerHTML = [...await (await fetch('/blogs')).json()]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(x => blogBoxTemplate(x)).join('');
    },
    userBlogs: async () => {
        getElbyId('blogs-section').innerHTML = [...await (await fetch('/blogs')).json()]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .filter(blog => blog.author === localStorage.getItem('user'))
            .map(x => renderUserBlog(x)).join('');
        getElbyId('top-section').innerHTML = renderUserInfo([...await (await fetch('/users')).json()]
            .find(x => x.fullname === localStorage.getItem('user')) ? [...await (await fetch('/users')).json()]
                .find(x => x.fullname === localStorage.getItem('user')) : goTo('/auth/'));
    },
    create: async () => {
        await fetch("/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `${[...await (await fetch("/blogs")).json()].at(-1).id + 1}`,
                author: cap(localStorage.getItem('user')),
                title: getElbyId('title').value,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                timestamp: new Date().toISOString(),
                mainText: getElbyId('mainText').value,
                content: getElbyId("blogContent").value.split('\n')
                    .map(l => {
                        l = l.trim();
                        if (!l) return null;
                        if (l.startsWith('# ')) return { type: "heading", level: 1, text: l.substring(2) };
                        if (l.startsWith('## ')) return { type: "heading", level: 2, text: l.substring(3) };
                        return { type: "paragraph", text: l };
                    }).filter(Boolean)

            })
        }).then(res => { res.ok ? goTo('/') : console.error(res.json()) });
    },
    delete: async (id, title) => {
        showConfirm(`Do You Want To Delete:<br> <strong>${title}</strong>`, async () => {
            await fetch(`/blogs/${id}`, { method: 'DELETE' })
                .then(() => blogs.userBlogs())
        })
    },
    renderEdit: async (id, callbackc) => {
        if (!localStorage.getItem('user') || ![...await (await fetch('/blogs')).json()]
            .filter(x => x.author === localStorage.getItem('user') && x.id === id).length) goTo('/');
        getElbyId('edit-blog').dataset.id = id;
        fetch(`/blogs/${id}`)
            .then(res => res.json())
            .then(blog => {
                document.getElementById('title').value = blog.title;
                document.getElementById('mainText').value = blog.mainText;
                document.getElementById('blogContent').value = blog.content
                    .map(block => block.type === 'heading' ? `${'#'.repeat(block.level)} ${block.text}` : block.text)
                    .join('\n\n');
                callbackc();
            });
    },
    saveEdit: () => {
        fetch(`/blogs/${getElbyId('edit-blog').dataset.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: getElbyId('title').value,
                mainText: getElbyId('mainText').value,
                timestamp: new Date().toISOString(),
                content: getElbyId("blogContent").value.split('\n')
                    .map(l => {
                        l = l.trim();
                        if (!l) return null;
                        if (l.startsWith('# ')) return { type: "heading", level: 1, text: l.substring(2) };
                        if (l.startsWith('## ')) return { type: "heading", level: 2, text: l.substring(3) };
                        return { type: "paragraph", text: l };
                    }).filter(Boolean)
            })
        }).then(res => { if (res.ok) goTo('/') })
    }
}

function cap(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

window.addEventListener("DOMContentLoaded", async () => {
    getElbyId('container') &&
        await blogs.loadAll().then(() => hideLoader())
    getElbyId("saveBlogBtn") &&
        getElbyId("saveBlogBtn").addEventListener('click', async () => await blogs.create())
    getElbyId("blog-body") &&
        await blogs.blog(new URLSearchParams(window.location.search).get('q'))
            .then(() => hideLoader())
    getElbyId('blogs-section') &&
        await blogs.userBlogs().then(() => hideLoader())
    getElbyId('edit-blog') &&
        await blogs.renderEdit(new URLSearchParams(window.location.search).get('id'),
            () => hideLoader())
})