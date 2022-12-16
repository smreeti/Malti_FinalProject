/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
let { dbConnection } = require("../database/dbConfig.js");

const dashboard = (req, res) => {
  let booksQuery = `SELECT b.name as bookName, CONCAT(a.firstName, ' ', a.lastName) as authorName, bc.categoryName, b.price, b.ISBN FROM book AS b
                        JOIN author AS a
                            ON b.authorId = a.authorId
                        JOIN bookcategory AS bc
                            ON b.bookCategoryID = bc.bookCategoryId`;

  let stockQuery = `SELECT b.name as bookName, CONCAT(a.firstName, ' ', a.lastName) as authorName, bc.categoryName, b.price, b.ISBN, s.quantity FROM book AS b
                        JOIN bookstock AS s
                            ON b.bookID = s.bookID
                        JOIN author AS a
                            ON b.authorId = a.authorId
                        JOIN bookcategory AS bc
                            ON b.bookCategoryID = bc.bookCategoryId`;
  try {
    dbConnection.query(booksQuery, (error, bookInfo) => {
      dbConnection.query(stockQuery, (error, stock) => {
        console.log("Get books/stock sucessfully!!!");
        res.render("dashboard", {
          data: { insertionError: null, bookInfo, stock },
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { dashboard };
