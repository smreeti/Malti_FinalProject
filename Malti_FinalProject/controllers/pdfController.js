const FPDF = require('node-fpdf')
const fs = require('fs');
let { dbConnection } = require('../database/dbConfig.js');
const path = require('path');

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

const printInvoice = (req, res) => {
    let bookOrderID = req.params.bookOrderID;
    const pdf = new PDF('P', 'mm', 'A4');

    pdf.AddPage();
    pdf.AliasNbPages();
    pdf.SetFont('Arial', 'B', 12);

    let bookOrderQuery = `SELECT orderNumber, quantity, orderedDate FROM bookorder b
                          WHERE b.bookOrderID = ${bookOrderID}`;

    try {
        dbConnection.query(bookOrderQuery, (error, result) => {
            pdf.Cell(36, 10, 'OrderNumber : ', 0, 0);
            pdf.Cell(100, 10, result[0].orderNumber, 0, 0);

            pdf.Ln(10);

            pdf.Cell(36, 10, 'Ordered Date : ', 0, 0);
            pdf.Cell(100, 10, (result[0].orderedDate).toISOString().split('T')[0], 0, 0);

            pdf.Ln(10);

            pdf.Cell(36, 10, 'Total Items : ', 0, 0);
            pdf.Cell(100, 10, result[0].quantity, 0, 0);
            pdf.Ln(10);

            pdf.Ln(20);
            pdf.Cell(180, 10, 'Selected Books', 0, 0, 'C');
            pdf.Ln(10);

            let bookOrderItemQuery = `SELECT oi.quantity, b.name, os.code 
                                        FROM orderitem oi
                                        JOIN book b ON b.bookID = oi.bookID
                                        JOIN orderstatus os ON os.orderStatusID = oi.orderStatusID
                                        WHERE oi.bookOrderID = ${bookOrderID}`;

            pdf.Cell(20, 20, 'S.N.', 0, 0, 'C');
            pdf.Cell(30, 20, 'Book', 0, 0, 'C');
            pdf.Cell(30, 20, 'Quantity', 0, 0, 'C');
            pdf.Ln(10);

            try {
                dbConnection.query(bookOrderItemQuery, (error, bookOrderItems) => {
                    console.log(error);
                    bookOrderItems.forEach((orderItem, index) => {
                        pdf.Cell(20, 20, index + 1, 0, 0, 'C');
                        pdf.Cell(20, 20, orderItem.name, 0, 0, 'C');
                        pdf.Cell(20, 20, orderItem.quantity, 0, 0, 'C');
                        pdf.Ln(10);
                    })
                    pdf.Output('P', `invoice.pdf`);
                    res.render('orderConfirmation', { bookOrderID });

                    // var data = fs.readFileSync('./public/test.pdf');
                    // res.contentType("application/pdf");
                    // res.send(data);
                });
            } catch (e) {
                console.log(e);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { printInvoice }