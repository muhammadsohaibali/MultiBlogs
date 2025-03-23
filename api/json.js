const blogData = require('../../src/blog_db.json');

export default function handler(req, res) {
    res.status(200).json(blogData);
}
