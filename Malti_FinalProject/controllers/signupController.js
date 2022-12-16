/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
let { dbConnection } = require('../database/dbConfig.js');
const bcrypt = require('bcrypt');

const signUp = (req, res) => {
    return res.render('signUp');
}

const signUpUser = async (req, res) => {
    let { firstName, lastName, email, phonenumber, username, password } = req.body;

    password = await bcrypt.hash(password, 10);

    let insertEmployeeQuery = `INSERT INTO employee(firstName, lastName, email, phoneNumber, username, password) 
                                VALUES ('${firstName}', '${lastName}', '${email}', '${phonenumber}', '${username}', '${password}')`;

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