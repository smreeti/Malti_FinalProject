let { dbConnection } = require('../database/dbConfig.js');
const mysql = require('mysql');

const addInventory = (req, res) => {
    res.render('addInventory', { insertionError: null });
}

const addOrder = (req, res) => { };

const confirmOrder = (req, res) => {
    const { bookOrderDetails: bookOrderDetailsString } = req.body;
    let bookOrderDetails = JSON.parse(bookOrderDetailsString);

    const { totalItems, selectedBookArray } = bookOrderDetails;
    let loggedInEmployeeId = req.session.loggedInId;

    let insertBookOrderQuery = `INSERT INTO bookOrder(quantity, orderedDate, employeeID, orderStatusID) VALUES 
        ( ${totalItems}, NOW(), 1, 1)`;

    try {
        dbConnection.query(insertBookOrderQuery, async (error, result) => {
            let lastInsertID = result.insertId;

            selectedBookArray.forEach(selectedBook => {
                let insertOrderItemQuery = `INSERT INTO orderItem(quantity, bookOrderID, bookID, orderStatusID) VALUES 
                    ( ${selectedBook.quantity}, ${lastInsertID},  ${selectedBook.bookId}, 1)`;

                dbConnection.query(insertOrderItemQuery, async (error, result) => {
                    if (error)
                        console.log(error);

                    res.render('addInventory', { insertionError: null });
                });
            })
        });
    } catch (error) {
        const insertionError = Object.keys(error.errors).map(key => {
            return error.errors[key].message
        });
        req.flash('insertionError', insertionError);
        res.render('addInventory', { insertionError: req.flash('insertionError') });
    }
}

module.exports = { addInventory, addOrder, confirmOrder }