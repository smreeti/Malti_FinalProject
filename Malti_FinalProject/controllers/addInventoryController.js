let { dbConnection } = require('../database/dbConfig.js');

const addInventory = (req, res) => {
    res.render('addInventory', { insertionError: null });
}

const addOrder = (req, res) => { };

const confirmOrder = (req, res) => {
    const { bookOrderDetails: bookOrderDetailsString } = req.body;
    let bookOrderDetails = JSON.parse(bookOrderDetailsString);

    const { totalItems, selectedBookArray } = bookOrderDetails;
    let loggedInEmployeeId = req.session.loggedInId;

    let randomNumber = Math.floor(Math.random() * 90000) + 10000;
    let insertBookOrderQuery = `INSERT INTO bookOrder(orderNumber, quantity, orderedDate, employeeID, orderStatusID) VALUES 
        ( ${randomNumber},${totalItems}, NOW(), ${loggedInEmployeeId}, 1)`;

    try {
        dbConnection.query(insertBookOrderQuery, async (error, result) => {
            let lastInsertID = result.insertId;

            selectedBookArray.forEach(selectedBook => {
                let insertOrderItemQuery = `INSERT INTO orderItem(quantity, bookOrderID, bookID, orderStatusID) VALUES (
                    ${selectedBook.quantity}, ${lastInsertID},  ${selectedBook.bookId}, 1)`;

                dbConnection.query(insertOrderItemQuery, async (error, result) => {
                    if (error)
                        console.log(error);

                    res.render('orderConfirmation', { bookOrderID: `${lastInsertID}` });
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