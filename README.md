# Team 12 Personal Portfolio System 🌐

A responsive portfolio website for Team 12, built to introduce the team, highlight our projects and skills, and let visitors send us a message.

## Features

- Login and account signup with viewer and admin roles
- Team introduction and skills section
- Responsive project gallery with live search
- Admin dashboard for adding and removing projects
- Contact form that saves messages for the admin to review
- Login heading with a cursor-triggered glitch effect
- Animated background effects and responsive layouts
- Browser storage using `localStorage` for accounts, projects, session state, and messages

## Team

- Bimlesh Pradhan
- Aahil Jamshid Wani
- Ankit Kumar

## Technologies

- HTML5
- CSS3
- JavaScript (ES6+)
- React 18 and ReactDOM, loaded from CDN for the interactive project gallery and login heading
- `localStorage` for browser-side data storage

The project uses a simple three-file structure: `index.html`, `styles.css`, and `script.js`. Most site features use plain JavaScript; React is used for selected interactive components.

## Run Locally

1. Download or clone the repository.
2. Open `index.html` in a browser, or use a local development server such as VS Code Live Server.
3. Keep an internet connection available so the React and ReactDOM CDN scripts can load.
4. Create an account using the signup form, then log in with it.

Choose the Viewer role to see the portfolio. Choose the Owner role to manage projects and review contact messages.

## Notes

This is a front-end project. Account credentials and messages are stored in the browser's `localStorage`, so this setup is for demonstration and learning rather than production authentication or secure message handling. Contact messages are not sent to an email server.

## Future Improvements

- Add project links, thumbnails, and technology tags
- Add a blog section
- Connect the contact form to a backend service
- Move authentication and data storage to a secure backend
- Refresh the gallery immediately after admin changes
- Improve accessibility and add more portfolio content
