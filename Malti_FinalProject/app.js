require("dotenv").config();
const express = require('express');
const app = express();

const route = require('./routes/routes.js');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

/* Declaring global variables that will be accessible from all EJS files */
global.userId = '';
global.isLoggedIn = false;

/* middleware for serving static files to Express app */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

/*Use express session to store the information in the browser*/
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))

app.use("*", (req, res, next) => {
    userId = req.session.userId;
    isLoggedIn = req.session.isLoggedIn;
    next();
})

/*To Flush error messages from session*/
app.use(flash());
app.use(route);
app.use((req, res) => res.render('notfound')); //creating a 404 page for non-existing route

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: ""
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

//  dbConnection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

app.listen(5600, () => {
    console.log("App is listening to port 5600");
})