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
    let bookOrderQuery = `SELECT orderNumber, quantity, orderedDate 
                        FROM bookorder b
                        JOIN orderstatus os ON b.orderStatusID = os.orderStatusID
                        WHERE b.bookOrderID = ${bookOrderID}`;

    try {
        dbConnection.query(bookOrderQuery, async (error, bookOrder) => {
            let bookOrderItemQuery = `SELECT oi.quantity, b.name FROM orderitem oi
                                    JOIN book b ON b.bookID = oi.bookID
                                    WHERE oi.bookOrderID = ${bookOrderID}`;
            try {
                await dbConnection.query(bookOrderItemQuery, async (error, orderItems) => {
                    let bookOrderDetails = { bookOrder: bookOrder[0], orderItems };
                    res.render('manageOrderDetails', { bookOrderDetails });
                })
            } catch (error) {
                console.log(error);
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const verifyOrder = (req, res) => {
    console.log(req.body);
    
}

module.exports = { manageInventory, manageOrderItem, verifyOrder };