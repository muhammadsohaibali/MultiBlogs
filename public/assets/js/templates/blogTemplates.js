const ts = (strg, len = 80) => {
    if (!(typeof strg === "string")) return console.error("This Is not String");
    if (strg.length > len) return `${strg.slice(0, len)}...`;
    return strg;
}

const showConfirm = (message, onConfirm, onCancel) => {
    const box = document.createElement('div');
    box.className = 'confirm-overlay';
    box.innerHTML = `
        <div class="confirm-box">
            <p>${message}</p>
            <div class="confirm-actions">
                <button class="confirm-btn">Yes</button>
                <button class="cancel-btn">No</button>
            </div>
        </div>`;
    document.body.appendChild(box);
    box.querySelector('.confirm-btn').onclick = () => { onConfirm(); box.remove(); };
    box.querySelector('.cancel-btn').onclick = () => { if (onCancel) onCancel(); box.remove(); };
};

// Templates
const blogBoxTemplate = (blog) => {
    return `
    <div class="blog-card">
        <div class="blog-header">
            <div>
                <h4>${blog.author}</h4>
                <span>${blog.date}</span>
            </div>
        </div>
        <h2>${blog.title}</h2>
        <p>${ts(blog.mainText)}</p>
        <a href="/blog/?q=${blog.id}">Read more →</a>
    </div>`;
}

const renderBlog = (blog) => {
    return `
        <article class="blog-post">
            <header class="post-header">
                <h1 class="post-title">${blog.title}</h1>
                <div class="blog-meta">
                    <div class="author">${blog.author}</div>
                    <div class="date">${blog.date}</div>
                </div>
            </header>
        <div class="post-content">
    ${blog.content.map(item => {
        if (item.type === 'heading' && item.level === 1) return `<h2>${item.text}</h2>`;
        if (item.type === 'heading' && item.level === 2) return `<h3>${item.text}</h3>`;
        if (item.type === 'paragraph') return `<p>${item.text}</p>`;
        return '';
    }).join('')}
        </div>
        </article>`;
}

const renderUserBlog = (blog) => {
    return `
        <article class="blog-post">
            <header class="post-header">
                <h1 class="post-title">${blog.title}</h1>
                <div class="blog-meta">
                    <div class="author">${blog.author}</div>
                    <div class="date">${blog.date}</div>
                </div>
            </header>
            <div class="post-content">
                ${blog.content.map(item => {
        if (item.type === 'heading' && item.level === 1) return `<h2>${item.text}</h2>`;
        if (item.type === 'heading' && item.level === 2) return `<h3>${item.text}</h3>`;
        if (item.type === 'paragraph') return `<p>${item.text}</p>`;
        return '';
    }).join('')}
            </div>
            <div class="post-actions">
                <button onclick='window.location.href = "/blog/edit/?id=${blog.id}"' class="edit-btn" data-id="${blog.id}">Edit Blog</button>
                <button onclick='blogs.delete("${blog.id}" ,"${blog.title}")' class="delete-btn" data-id="${blog.id}">Delete Blog</button>
            </div>
        </article>
    `;
};

const renderUserInfo = (user) => {
    return `
        <div class="user-info">
            <h1>${user.fullname}</h1>
            <p>Username: ${user.username}</p>
            <p>User ID: ${user.id}</p>
        </div>
        <button onclick='auth.logout()' class="logout-btn">Switch Account</button>
    `;
};
