/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
const { dashboard } = require('./dashboardController.js');
const { login, loginEmployee } = require('./loginController.js');
const { addInventory, addOrder, confirmOrder } = require('./addInventoryController.js');
const { manageInventory, manageOrderItem, verifyOrder } = require('./manageInventoryController.js');
const { signUp, signUpUser } = require('./signupController.js');
const { logout } = require('./logoutController.js');
const { printInvoice } = require('./invoiceController.js');
const { reports, fetchBookStocks, fetchBookList } = require('./reportsController.js');

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
    logout,
    printInvoice,
    reports,
    fetchBookStocks,
    fetchBookList
}