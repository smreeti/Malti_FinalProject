let { dbConnection } = require('../database/dbConfig.js');

const manageInventory = (req, res) => {
    let bookOrderQuery = `SELECT bookOrderID, orderNumber, quantity, orderedDate FROM bookorder b
                         JOIN orderstatus os ON b.orderStatusID = os.orderStatusID
                         WHERE os.code = 'PENDING'`;

    try {
        dbConnection.query(bookOrderQuery, async (error, result) => {
            res.render('manageInventory', { result });
        });
    } catch (error) {
        console.log(error);
    }
}

const manageOrderItem = (req, res) => {
    let bookOrderID = req.params.bookOrderID;
    let bookOrderQuery = `SELECT bookOrderID, orderNumber, quantity, orderedDate, b.orderStatusID 
                        FROM bookorder b
                        JOIN orderstatus os ON b.orderStatusID = os.orderStatusID
                        WHERE b.bookOrderID = ${bookOrderID}`;

    let orderStatusQuery = `SELECT orderStatusID, code FROM orderStatus`;
    try {
        dbConnection.query(orderStatusQuery, async (error, orderStatus) => {
            if (orderStatus) {
                dbConnection.query(bookOrderQuery, async (error, bookOrder) => {

                    let bookOrderItemQuery = `SELECT oi.orderItemID, oi.quantity, b.name, os.orderStatusID, os.code 
                                FROM orderitem oi
                                JOIN book b ON b.bookID = oi.bookID
                                JOIN orderstatus os ON os.orderStatusID = oi.orderStatusID
                                WHERE oi.bookOrderID = ${bookOrderID}`;

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
            })
        } catch (e) {
            console.log(e);
        }
    })

    //update order status of BookOrder
    let updateBookOrderItemQuery = `UPDATE bookOrder SET orderStatusID = ${bookOrderStatus} 
                                    WHERE bookOrderID =${bookOrder.bookOrderID}`;

    try {
        dbConnection.query(updateBookOrderItemQuery, async (error, response) => {
            console.log(error, response);
        })
    } catch (e) {
        console.log(e);
    }

    res.redirect('/manageInventory');
}

module.exports = { manageInventory, manageOrderItem, verifyOrder };