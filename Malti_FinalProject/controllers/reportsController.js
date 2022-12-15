const FPDF = require('node-fpdf')
let { dbConnection } = require('../database/dbConfig.js');
const path = require('path');

const reports = (req, res) => {
    res.render('reports');
}

class PDF extends FPDF {
    // Page header
    Header() {
        // Logo
        this.Image(path.join(__dirname, '..', 'public', 'images', 'books-banner.jpg'), 90, 5, 20, 0, 'JPG');
        this.Ln(10);
        this.SetFont('Arial', 'B', 13);

        // Header Title
        this.Cell(180, 10, 'Malti Book Store', 0, 0, 'C');

        // Line break
        this.Ln(20);
    }

    // Page footer
    Footer() {
        // Position at 1.5 cm from bottom
        this.SetY(-15);
        // Arial italic 8
        this.SetFont('Arial', 'I', 8);
        // Page number
        this.Cell(0, 10, this.PageNo(), 0, 0, 'C');
    }
}

const fetchBookStocks = (req, res) => {
    const pdf = new PDF('P', 'mm', 'A4');

    pdf.AddPage();
    pdf.AliasNbPages();
    pdf.SetFont('Arial', 'B', 12);
    pdf.Cell(180, 10, 'Available Book Stock Report', 0, 0, 'C');
    pdf.Ln(10);

    let bookStocksQuery = `SELECT b.name, bc.categoryName, b.price, bs.quantity
                          FROM bookstock bs 
                          JOIN book b ON b.bookID = bs.bookID
                          JOIN bookCategory bc ON bc.bookCategoryId = b.bookCategoryID`;

    try {
        dbConnection.query(bookStocksQuery, (error, bookStockResult) => {
            console.log(error, bookStockResult);
            if (bookStockResult.length > 0) {

                pdf.Cell(10, 10, 'S.N.', 1, 0, 'C');
                pdf.Cell(60, 10, 'Book', 1, 0, 'C');
                pdf.Cell(60, 10, 'Book Category', 1, 0, 'C');
                pdf.Cell(20, 10, 'Price', 1, 0, 'C');
                pdf.Cell(30, 10, 'Quantity', 1, 0, 'C');
                pdf.Ln(10);

                bookStockResult.forEach((bookInfo, index) => {
                    pdf.Cell(10, 10, index + 1, 1, 0, 'C');
                    pdf.Cell(60, 10, bookInfo.name, 1, 0, 'C');
                    pdf.Cell(60, 10, bookInfo.categoryName, 1, 0, 'C');
                    pdf.Cell(20, 10, '$ ' + bookInfo.price, 1, 0, 'C');
                    pdf.Cell(30, 10, bookInfo.quantity, 1, 0, 'C');
                    pdf.Ln(10);
                })

                pdf.Ln(5);

                pdf.Output('P', `invoice.pdf`);
                res.render('reports');

                // var data = fs.readFileSync('./public/test.pdf');
                // res.contentType("application/pdf");
                // res.send(data);
            } else {
                res.render('reports');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { reports, fetchBookStocks }