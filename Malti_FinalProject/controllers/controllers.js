const { dashboard } = require('./dashboardController.js');
const { login, loginEmployee } = require('./loginController.js');
const { addInventory, addOrder, confirmOrder } = require('./addInventoryController.js');

module.exports = {
    dashboard,
    login,
    loginEmployee,
    addInventory,
    addOrder,
    confirmOrder
}