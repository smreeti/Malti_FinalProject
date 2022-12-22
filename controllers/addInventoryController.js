/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
let { dbConnection } = require('../database/dbConfig.js');

const addInventory = (req, res) => {

    let bookCategoryQuery = "SELECT * FROM bookCategory";
    let bookQuery = "SELECT * FROM book";
    try {
        dbConnection.query(bookCategoryQuery, (error, bookCategory) => {
            console.log(error, bookCategory);

            dbConnection.query(bookQuery, (error, books) => {
                console.log(error, books);

                res.render('addInventory', { insertionError: null, data: { bookCategory, books } });
            })
        })
    } catch (e) {
        console.log(e);
    }
}

const addOrder = (req, res) => { };

const confirmOrder = (req, res) => {
    const { bookOrderDetails: bookOrderDetailsString } = req.body;
    let bookOrderDetails = JSON.parse(bookOrderDetailsString);

    const { totalItems, selectedBookArray, totalAmount } = bookOrderDetails;
    let loggedInEmployeeId = req.session.loggedInId;

    let randomNumber = Math.floor(Math.random() * 90000) + 10000;
    let insertBookOrderQuery = `INSERT INTO bookOrder(orderNumber, quantity, orderedDate, employeeID, orderStatusID, totalAmount) VALUES 
        ( ${randomNumber},${totalItems}, NOW(), ${loggedInEmployeeId}, 1, ${totalAmount})`;

    console.log(insertBookOrderQuery);
    try {
        dbConnection.query(insertBookOrderQuery, (error, result) => {
            console.log("data inserted", result);
            let lastInsertID = result.insertId;

            selectedBookArray.forEach(selectedBook => {
                let insertOrderItemQuery = `INSERT INTO orderItem(quantity, bookOrderID, bookID, orderStatusID) VALUES (
                    ${selectedBook.quantity}, ${lastInsertID},  ${selectedBook.bookId}, 1)`;

                dbConnection.query(insertOrderItemQuery, (error, result) => {
                    console.log(error, result);

                    res.render('orderConfirmation', { bookOrderID: `${lastInsertID}`, orderNumber: `${randomNumber}` });
                });
            })
        });
    } catch (error) {
        console.log("Error", error);
        res.redirect('/');
    }
}

module.exports = { addInventory, addOrder, confirmOrder }