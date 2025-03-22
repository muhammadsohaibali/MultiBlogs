# MultiBlogs

MultiBlogs is a simple blog platform built with HTML, CSS, and JavaScript, using JSON Server as a mock backend REST API. This project allows users to view, create, and delete blog posts, as well as register and login.

## Features

- Blog listing with dynamic content fetched from JSON Server
- Create and publish new blog articles
- Delete existing blog posts with a confirmation prompt
- User registration and login system using local JSON database
- Form validation with custom error messages
- LocalStorage session handling for logged-in users
- Fully responsive UI

## Technologies Used

- HTML5
- CSS3 (Custom styles)
- Vanilla JavaScript (ES6+)
- JSON Server (for local REST API)

## Project Structure

```
/MultiBlogs
├── /public
│ ├── /assets
│ │ ├── /css
│ │ │ ├── blog.css
│ │ │ ├── blogspage.css
│ │ │ ├── confirmation.css
│ │ │ ├── me.css
│ │ │ ├── newblog.css
│ │ │ ├── structure.css
│ │ │ └── user.css
│ │ └── /js
│ │ ├── blog.js
│ │ ├── user.js
│ │ └── /templates
│ │ └── blogTemplates.js
│ │
│ ├── /auth
│ │ ├── /new
│ │ │ └── index.html
│ │ └── index.html
│ │
│ ├── /blog
│ │ ├── /new
│ │ │ └── index.html
│ │ └── index.html
│ │
│ ├── /me
│ │ └── index.html
│ │
│ └── index.html
│
├── /src
│ └── blog_db.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

1. **Clone this repository:**

   ```bash
   git clone https://github.com/muhammadsohaibali/MultiBlogs.git
   cd MultiBlogs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server (API + Static Files):**

   ```bash
   npm start
   ```

4. **Open in Browser:**
   Visit:
   ```
   http://localhost:3000/
   ```

## Notes

- This is a front-end project using JSON Server as a mock backend.
- Make sure to update API endpoint URLs to match your local JSON Server URL (e.g., `http://localhost:3000/`).

## Author

Developed by Muhammad Sohaib Ali

[GitHub Repository](https://github.com/muhammadsohaibali/MultiBlogs)

```

```
