/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
const mysql = require('mysql');

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "malti_bookstore"

}
const dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(function (err) {
    if (err)
        console.log('error connecting:' + err);
    else
        console.log('connected successfully to DB.');
});

module.exports = { dbConnection };