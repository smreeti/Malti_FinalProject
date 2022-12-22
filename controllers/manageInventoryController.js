/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
let { dbConnection } = require('../database/dbConfig.js');

const manageInventory = (req, res) => {
    let orderStatus = req.query.orderStatus;
    console.log("otfet0",orderStatus)

    let bookOrderQuery = `SELECT bookOrderID, orderNumber, quantity, orderedDate, os.code as orderStatus, totalAmount FROM bookorder b JOIN orderstatus os ON b.orderStatusID = os.orderStatusID`;

    console.log(orderStatus)

    if (orderStatus) {
        bookOrderQuery += ` WHERE os.code = '${orderStatus}'`;
    }

    console.log(bookOrderQuery)
    try {
        dbConnection.query(bookOrderQuery, async (error, result) => {
            console.log(error, result);
            res.render('manageInventory', { result });
        });
    } catch (error) {
        console.log(error);
    }
}

const manageOrderItem = (req, res) => {
    let bookOrderID = req.params.bookOrderID;
    let bookOrderQuery = `SELECT bookOrderID, orderNumber, quantity, orderedDate, b.orderStatusID, totalAmount,
                        CONCAT(firstName, ' ', lastName)as employee 
                        FROM bookorder b
                        JOIN orderstatus os ON b.orderStatusID = os.orderStatusID
                        JOIN employee e ON e.employeeID = b.employeeID
                        WHERE b.bookOrderID = ${bookOrderID}`;

    let orderStatusQuery = `SELECT orderStatusID, code FROM orderStatus`;
    try {
        dbConnection.query(orderStatusQuery, async (error, orderStatus) => {
            if (orderStatus) {
                dbConnection.query(bookOrderQuery, async (error, bookOrder) => {

                    let bookOrderItemQuery = `SELECT oi.orderItemID, oi.quantity, b.bookID, b.name, os.orderStatusID, os.code 
                                FROM orderitem oi
                                JOIN book b ON b.bookID = oi.bookID
                                JOIN orderstatus os ON os.orderStatusID = oi.orderStatusID
                                WHERE oi.bookOrderID = ${bookOrderID}`;

                    console.log(error, bookOrder);

                    if (bookOrder) {
                        dbConnection.query(bookOrderItemQuery, async (error, orderItems) => {
                            let bookOrderDetails = { bookOrder: bookOrder[0], orderItems };
                            res.render('manageOrderDetails', { bookOrderDetails, orderStatus });
                        })
                    } else {
                        res.redirect('/manageInventory');
                    }
                })
            } else {
                res.redirect('/manageInventory');
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const verifyOrder = (req, res) => {

    const { bookOrderDetails: bookOrderDetailsString, bookOrderStatus } = req.body;
    let bookOrderDetails = JSON.parse(bookOrderDetailsString);
    const { bookOrder, orderItems } = bookOrderDetails;
    console.log(req.body)

    //update each order status in order items
    orderItems.forEach(orderItem => {
        let updateOrderItemQuery = `UPDATE orderItem SET orderStatusID = ${orderItem.orderStatusID} 
                                    WHERE orderItemID =${orderItem.orderItemID}`;
        try {
            dbConnection.query(updateOrderItemQuery, async (error, orderItems) => {
                console.log(error, orderItems);
                let selectBookStockQuery = `SELECT * FROM bookStock WHERE bookID = ${orderItem.bookID}`;

                //if the book already exists, simply update the quantity count else insert new record of Book Stock with corresponding book and quantity.
                dbConnection.query(selectBookStockQuery, async (error, bookStocks) => {
                    if (bookStocks && bookStocks.length > 0) {
                        let updateBookStockQuery = `UPDATE bookStock SET quantity = quantity + ${orderItem.quantity} WHERE bookID = ${orderItem.bookID}`;

                        dbConnection.query(updateBookStockQuery, async (error, bookStocks) => {
                            console.log(bookStocks, error);
                        })
                    } else {
                        let insertBookStockQuery = `INSERT INTO bookStock(quantity, bookID) VALUES 
                                                    (${orderItem.quantity}, ${orderItem.bookID} )`;

                        dbConnection.query(insertBookStockQuery, async (error, bookStocks) => {
                            console.log(bookStocks, error);
                        })
                    }
                })
            })
        } catch (e) {
            console.log(e);
        }
    })

    //update order status of BookOrder
    let updateBookOrderQuery = `UPDATE bookOrder SET orderStatusID = ${bookOrderStatus} 
                                    WHERE bookOrderID =${bookOrder.bookOrderID}`;

    try {
        dbConnection.query(updateBookOrderQuery, async (error, response) => {
            console.log(error, response);
        })
    } catch (e) {
        console.log(e);
    }

    res.redirect('/manageInventory');
}

module.exports = { manageInventory, manageOrderItem, verifyOrder };