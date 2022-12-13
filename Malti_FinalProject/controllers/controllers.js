const { dashboard } = require('./dashboardController.js');
const { login, loginEmployee } = require('./loginController.js');
const { addInventory, addOrder, confirmOrder } = require('./addInventoryController.js');
const { manageInventory, manageOrderItem, verifyOrder } = require('./manageInventoryController.js');
const { signUp, signUpUser } = require('./signupController.js');
const { logout } = require('./logoutController.js');

module.exports = {
    dashboard,
    login,
    loginEmployee,
    addInventory,
    addOrder,
    confirmOrder,
    manageInventory,
    manageOrderItem,
    verifyOrder,
    signUp,
    signUpUser,
    logout
}