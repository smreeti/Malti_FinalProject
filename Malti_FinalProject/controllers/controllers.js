const { dashboard } = require('./dashboardController.js');
const { login, loginEmployee } = require('./loginController.js');
const { addInventory, addOrder, confirmOrder } = require('./addInventoryController.js');
const { manageInventory, manageOrderItem, verifyOrder } = require('./manageInventoryController.js');

module.exports = {
    dashboard,
    login,
    loginEmployee,
    addInventory,
    addOrder,
    confirmOrder,
    manageInventory,
    manageOrderItem,
    verifyOrder
}