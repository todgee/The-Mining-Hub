const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Folder for your EJS templates

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MySQL database connection
const db = mysql.createConnection({
    host: '172.26.96.1',
    user: 'test',
    password: 'test',
    database: 'event_scheduler'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes for serving different pages using EJS
app.get('/', (req, res) => {
    res.render('home');  // Render home.ejs
});

app.get('/home', (req, res) => {
    res.render('home');  // Render home.ejs
});

app.get('/chat', (req, res) => {
    res.render('chat');  // Render chat.ejs
});

app.get('/calendar', (req, res) => {
    res.render('calendar');  // Render calendar.ejs
});

app.get('/settings', (req, res) => {
    res.render('settings');  // Render settings.ejs
});

app.get('/profile', (req, res) => {
    res.render('profile');  // Render profile.ejs
});

// Catch-all route for unknown pages
app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Start the server and dynamically import the 'open' module
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    const open = (await import('open')).default;  // Dynamically import 'open'
    open(`http://localhost:${port}`);
});
