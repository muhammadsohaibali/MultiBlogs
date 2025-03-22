# MultiBlogs

MultiBlogs is a simple blog platform built with HTML, CSS, and JavaScript, using JSON Server as a mock backend REST API. This project allows users to view, create, and delete blog posts, as well as register and login.

## Features

- Blog listing with dynamic content fetched from JSON Server
- Create and publish new blog articles
- Delete existing blog posts with a confirmation prompt
- User registration and login system using local JSON database
- Form validation with custom error messages
- Display blog post metadata like author and date
- Universal confirmation modal for actions like delete
- LocalStorage session handling for logged-in users
- Fully responsive and dark-themed UI

## Technologies Used

- HTML5
- CSS3 (Custom styles)
- Vanilla JavaScript (ES6+)
- JSON Server (for local REST API)

## Project Structure

```
/MultiBlogs
│
├── /src
│   ├── blog_db.json         # Blog database (used with JSON Server)
│   ├── /assets              # Images, fonts, icons, etc.
│   └── /js                  # All JavaScript files (UI + API handlers)
│
├── index.html               # Landing Page (Blog list)
├── blog.html                # Blog detail page
├── register.html            # User registration page
├── login.html               # User login page
├── ex.html                  # Example or test page (optional)
├── styles.css               # Main CSS file
├── .gitignore               # Git ignore rules (e.g., node_modules/)
└── README.md                # Project documentation (this file)
```

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/muhammadsohaibali/MultiBlogs.git
   cd MultiBlogs
   ```

2. Install JSON Server globally (if not already installed):
   ```bash
   npm install -g json-server
   ```

3. Start JSON Server:
   ```bash
   json-server --watch src/blog_db.json --port 3000
   ```

4. Open `index.html` in your browser to view the project.

## Notes

- This is a front-end project using JSON Server as a mock backend.
- Make sure to update API endpoint URLs to match your local JSON Server URL (e.g., `http://localhost:3000/`).
- Do not push large folders like `node_modules/` to GitHub. Use a `.gitignore` file.

## Future Improvements

- Add blog editing functionality
- Implement JWT authentication
- Add pagination to blog lists
- Deploy to GitHub Pages or Vercel

## Author

Developed by Muhammad Sohaib Ali

[GitHub Repository](https://github.com/muhammadsohaibali/MultiBlogs)
```