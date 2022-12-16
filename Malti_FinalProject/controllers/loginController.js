/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
let { dbConnection } = require('../database/dbConfig.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const login = (req, res) => {
    res.render('login', { userValid: null, username: null, password: null });
};

const loginEmployee = (req, res) => {
    const { username, password } = req.body;
    let employeeQuery = 'SELECT * FROM employee WHERE username = ' + mysql.escape(username);

    dbConnection.query(employeeQuery, async (error, employee) => {
        if (employee && employee.length > 0) {
            let same = await bcrypt.compare(password, employee[0]['password']);
            if (same) { //if passwords match
                req.session.loggedInId = employee[0].employeeID;
                req.session.isLoggedIn = true;
                req.session.loggedInEmployee = employee[0].firstName;
                return res.redirect('/');
            }
        }
        console.log("Employee not found");
        return res.render('login', { userValid: false, username, password });
    });
}

module.exports = { login, loginEmployee };