
# Web Server Application

This is a simple Node.js web server using Express that serves different pages and handles basic login functionality.

## Features

- Renders EJS templates for different web pages.
- Serves static files from the `public` directory.
- Basic login functionality using a dummy account.
- Automatically opens the web server in the default browser upon start.

## Prerequisites

Before you can run the server, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/todgee/The-Mining-Hub
   ```
   
2. Navigate to the project directory:
   ```bash
   cd The-Mining-Hub
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

To start the server, use the following command:
```bash
node server.js
```

The server will start on `http://localhost:3000`, and your default browser will open to this URL automatically.

### Available Pages

- **Login Page**: `http://localhost:3000/`
- **Home Page**: `http://localhost:3000/home`
- **Chat Page**: `http://localhost:3000/chat`
- **Calendar Page**: `http://localhost:3000/calendar`
- **Settings Page**: `http://localhost:3000/settings`
- **Profile Page**: `http://localhost:3000/profile`

## Login Information

To test the login functionality, use the following credentials:
- **Username**: `GBlackwood`
- **Password**: `password`

## File Structure

```
.
├── public/                 # Static files (CSS, images, etc.)
├── views/                  # EJS templates for different pages
│   ├── login.ejs           # Login page template
│   ├── home.ejs            # Home page template
│   ├── chat.ejs            # Chat page template
│   ├── calendar.ejs        # Calendar page template
│   ├── settings.ejs        # Settings page template
│   └── profile.ejs         # Profile page template
├── server.js               # Main server file
└── README.md               # This README file
```

## Dependencies

- **Express**: Web framework for Node.js.
- **EJS**: Template engine for rendering HTML.
- **body-parser**: Middleware to parse JSON and URL-encoded data.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing).

