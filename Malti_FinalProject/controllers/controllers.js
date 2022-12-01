var config = require('../database/dbConfig.js');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const { parseObjectValues } = require('../utils/JsonMapper.js')

const dashboard = (req, res) => {
    res.render('dashboard');
};

const login = (req, res) => {
    res.render('login', { userValid: null, username: null, password: null });
};

const loginCustomer = (req, res) => {
    const { username, password } = req.body;
    let customerQuery = 'SELECT * FROM customer WHERE username = ' + mysql.escape(username);

    config.dbConnection.query(customerQuery, async (error, customer) => {
        if (customer && customer.length > 0) {
            let result = parseObjectValues(customer)[0];
            let same = await bcrypt.compare(password, result.password);

            if (same) { //if passwords match
                req.session.loggedInId = result.CustomerId;
                req.session.isLoggedIn = true;
                console.log(req.session)
                return res.redirect('/');
            }
        }
        console.log("User not found");
        return res.render('login', { userValid: false, username, password });
    });
}

module.exports = {
    dashboard,
    login,
    loginCustomer
}