let { dbConnection } = require("../database/dbConfig.js");

const dashboard = (req, res) => {
  let booksQuery = `SELECT b.name as bookName, a.firstName as authorFName, a.lastName as authorLName, bc.categoryName, b.price, b.ISBN 
                    FROM book AS b 
                    JOIN author AS a ON b.authorId = a.authorId 
                    JOIN bookcategory AS bc ON b.bookCategoryID = bc.bookCategoryId`;
  try {
    dbConnection.query(booksQuery, (error, bookInfo) => {
      console.log("Get books sucessfully!!!");
      console.log(error, bookInfo);
      res.render("dashboard", {
        data: { insertionError: null, bookInfo },
      });
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { dashboard };
