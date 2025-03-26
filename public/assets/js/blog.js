if (!l.getItem('user')) location.href = '/auth'
else getElbyId('welcome-text').innerHTML = l.getItem('user');

function cap(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

const blogs = {
    blog: async (id) => {
        const res = await fetch(`${baseURL}/blogs/${id}`);
        res.ok ? (getElbyId("blog-body").appendChild(renderBlog(await res.json())), hideLoader()) : goTo('/');
    },
    loadAll: async () => {
        [...await (await fetch(`${baseURL}/blogs`)).json()]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(x => getElbyId('container').appendChild(blogBoxTemplate(x)));
    },
    userBlogs: async () => {
        const [allBlogs, users] = await Promise.all([
            fetch(`${baseURL}/blogs`).then(res => res.json()),
            fetch(`${baseURL}/users`).then(res => res.json())
        ]);
        getElbyId('blogs-section').innerHTML = '';
        allBlogs.filter(b => b.author === l.getItem('user'))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .forEach(x => getElbyId('blogs-section').appendChild(renderUserBlog(x)));
        const userInfo = users.find(x => x.fullname === l.getItem('user'));
        getElbyId('top-section').prepend(userInfo ? renderUserInfo(userInfo) : goTo('/auth/'));
    },
    create: async () => {
        await fetch(`${baseURL}/blogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: `${parseInt([...await (await fetch(`${baseURL}/blogs`)).json()].at(-1).id) + 1}` || '1',
                author: cap(l.getItem('user')),
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
            await fetch(`${baseURL}/blogs/${id}`, { method: 'DELETE' })
                .then(() => blogs.userBlogs())
        })
    },
    renderEdit: async (id, callbackc) => {
        if (!l.getItem('user') || ![...await (await fetch(`${baseURL}/blogs`)).json()]
            .filter(x => x.author === l.getItem('user') && x.id === id).length) goTo('/');
        getElbyId('edit-blog').dataset.id = id;
        fetch(`${baseURL}/blogs/${id}`)
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
        fetch(`${baseURL}/blogs/${getElbyId('edit-blog').dataset.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: getElbyId('title').value,
                mainText: getElbyId('mainText').value,
                timestamp: new Date().toISOString(),
                content: getElbyId("blogContent").value.split('\n')
                    .map(l => {
                        l = l.trim();
                        return !l ? null :
                            l.startsWith('# ') ? { type: "heading", level: 1, text: l.slice(2) } :
                                l.startsWith('## ') ? { type: "heading", level: 2, text: l.slice(3) } :
                                    { type: "paragraph", text: l };
                    }).filter(Boolean)
            })
        }).then(res => { if (res.ok) goTo('/') })
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    getElbyId('container') && await blogs.loadAll().then(hideLoader);
    getElbyId("saveBlogBtn")?.addEventListener('click', async () => await blogs.create());
    getElbyId("blog-body") && await blogs.blog(params.get('q'));
    getElbyId('blogs-section') && await blogs.userBlogs().then(hideLoader);
    getElbyId('edit-blog') && await blogs.renderEdit(params.get('id'), hideLoader);
});