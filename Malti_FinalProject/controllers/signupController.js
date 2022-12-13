let { dbConnection } = require('../database/dbConfig.js');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {
    return res.render('signUp');
}

const signUpUser = async (req, res) => {
    let { firstName, lastName, email, phonenumber, address, username, password } = req.body;

    password = await bcrypt.hash(password, 10);

    console.log(password)

    let insertEmployeeQuery = `INSERT INTO employee(firstName, lastName, email, phoneNumber, address, username, password) 
    VALUES ('${firstName}', '${lastName}', '${email}', '${phonenumber}', '${address}', '${username}', '${password}')`;

    console.log(insertEmployeeQuery);
    try {
        dbConnection.query(insertEmployeeQuery, async (error, result) => {
            console.log(error, result);
        });

        return res.redirect('login');
    } catch (error) {
        console.log(error);
    }
}

module.exports = { signUp, signUpUser };