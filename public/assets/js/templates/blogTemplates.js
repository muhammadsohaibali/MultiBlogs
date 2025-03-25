const ts = (strg, len = 80) => {
    if (!(typeof strg === "string")) return console.error("This Is not String");
    if (strg.length > len) return `${strg.slice(0, len)}...`;
    return strg;
}

function showConfirm(message, onConfirm, onCancel) {
    var box = document.createElement('div');
    box.className = 'confirm-overlay';
    var confirmBox = document.createElement('div');
    confirmBox.className = 'confirm-box';
    var text = document.createElement('p');
    text.innerHTML = message;
    var actions = document.createElement('div');
    actions.className = 'confirm-actions';
    var yesBtn = document.createElement('button');
    yesBtn.className = 'confirm-btn';
    yesBtn.appendChild(document.createTextNode('Yes'));
    var noBtn = document.createElement('button');
    noBtn.className = 'cancel-btn';
    noBtn.appendChild(document.createTextNode('No'));
    yesBtn.onclick = function () { onConfirm(); box.remove(); };
    noBtn.onclick = function () { if (onCancel) onCancel(); box.remove(); };
    actions.appendChild(yesBtn);
    actions.appendChild(noBtn);
    confirmBox.appendChild(text);
    confirmBox.appendChild(actions);
    box.appendChild(confirmBox);
    document.body.appendChild(box);
}

// Templates
function blogBoxTemplate(blog) {
    var card = document.createElement('div');
    card.className = 'blog-card';
    var header = document.createElement('div');
    header.className = 'blog-header';
    var headerContent = document.createElement('div');
    var author = document.createElement('h4');
    author.appendChild(document.createTextNode(blog.author));
    var date = document.createElement('span');
    date.appendChild(document.createTextNode(blog.date));
    headerContent.appendChild(author);
    headerContent.appendChild(date);
    header.appendChild(headerContent);
    var title = document.createElement('h2');
    title.appendChild(document.createTextNode(blog.title));
    var text = document.createElement('p');
    text.appendChild(document.createTextNode(ts(blog.mainText)));
    var link = document.createElement('a');
    link.href = `/blog/?q=${blog.id}`;
    link.appendChild(document.createTextNode('Read more →'));
    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(link);
    return card;
}

function renderBlog(blog) {
    var article = document.createElement('article');
    article.className = 'blog-post';
    var header = document.createElement('header');
    header.className = 'post-header';
    var title = document.createElement('h1');
    title.className = 'post-title';
    title.appendChild(document.createTextNode(blog.title));
    var meta = document.createElement('div');
    meta.className = 'blog-meta';
    var author = document.createElement('div');
    author.className = 'author';
    author.appendChild(document.createTextNode(blog.author));
    var date = document.createElement('div');
    date.className = 'date';
    date.appendChild(document.createTextNode(blog.date));
    meta.appendChild(author);
    meta.appendChild(date);
    header.appendChild(title);
    header.appendChild(meta);
    var content = document.createElement('div');
    content.className = 'post-content';
    blog.content.forEach(function (item) {
        var element;
        if (item.type === 'heading' && item.level === 1) element = document.createElement('h2');
        else if (item.type === 'heading' && item.level === 2) element = document.createElement('h3');
        else if (item.type === 'paragraph') element = document.createElement('p');
        if (element) {
            element.appendChild(document.createTextNode(item.text));
            content.appendChild(element);
        }
    });
    article.appendChild(header);
    article.appendChild(content);
    return article;
}

function renderUserBlog(blog) {
    var article = renderBlog(blog);
    var actions = document.createElement('div');
    actions.className = 'post-actions';
    var editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.setAttribute('data-id', blog.id);
    editBtn.textContent = 'Edit Blog';
    editBtn.onclick = function () { goTo(`/blog/edit/?id=${blog.id}`) };
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('data-id', blog.id);
    deleteBtn.textContent = 'Delete Blog';
    deleteBtn.onclick = () => { blogs.delete(blog.id, blog.title); };
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    article.appendChild(actions);
    return article;
}

function renderUserInfo(user) {
    var userInfo = document.createElement('div');
    userInfo.className = 'user-info';
    var name = document.createElement('h1');
    name.appendChild(document.createTextNode(user.fullname));
    var username = document.createElement('p');
    username.appendChild(document.createTextNode(`Username: ${user.username}`));
    var userId = document.createElement('p');
    userId.appendChild(document.createTextNode(`User ID: ${user.id}`));
    userInfo.appendChild(name);
    userInfo.appendChild(username);
    userInfo.appendChild(userId);
    return userInfo;
}
