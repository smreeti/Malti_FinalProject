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

    let bookOrderQuery = `SELECT orderNumber, quantity, orderedDate, totalAmount, CONCAT(firstName, ' ', lastName)as employee  
                        FROM bookorder b
                        JOIN employee e ON e.employeeID = b.employeeID
                        WHERE b.bookOrderID = ${bookOrderID}`;

    try {
        dbConnection.query(bookOrderQuery, (error, result) => {
            if (result.length > 0) {
                pdf.Cell(36, 10, 'OrderNumber : ', 0, 0);
                pdf.Cell(100, 10, result[0]?.orderNumber, 0, 0);

                pdf.Ln(10);

                pdf.Cell(36, 10, 'Ordered Date : ', 0, 0);
                pdf.Cell(100, 10, (result[0]?.orderedDate).toISOString().split('T')[0], 0, 0);

                pdf.Ln(10);

                pdf.Cell(36, 10, 'Issued by : ', 0, 0);
                pdf.Cell(100, 10, result[0]?.employee, 0, 0);

                pdf.Ln(10);

                pdf.Cell(36, 10, 'Total Items : ', 0, 0);
                pdf.Cell(100, 10, result[0]?.quantity, 0, 0);
                pdf.Ln(10);

                pdf.Ln(10);
                pdf.Cell(180, 10, 'Selected Books', 0, 0, 'C');
                pdf.Ln(10);

                let bookOrderItemQuery = `SELECT oi.quantity, b.name, os.code, b.price, (b.price * oi.quantity) as subtotal 
                                        FROM orderitem oi
                                        JOIN book b ON b.bookID = oi.bookID
                                        JOIN orderstatus os ON os.orderStatusID = oi.orderStatusID
                                        JOIN bookOrder bo ON oi.bookOrderID = bo.bookOrderID
                                        WHERE oi.bookOrderID = ${bookOrderID}`;

                pdf.Cell(20, 10, 'S.N.', 1, 0, 'C');
                pdf.Cell(90, 10, 'Book', 1, 0, 'C');
                pdf.Cell(20, 10, 'Quantity', 1, 0, 'C');
                pdf.Cell(20, 10, 'Price', 1, 0, 'C');
                pdf.Cell(30, 10, 'Sub Total', 1, 0, 'C');
                pdf.Ln(10);

                try {
                    dbConnection.query(bookOrderItemQuery, (error, bookOrderItems) => {
                        console.log(error);
                        bookOrderItems.forEach((orderItem, index) => {
                            pdf.Cell(20, 10, index + 1, 1, 0, 'C');
                            pdf.Cell(90, 10, orderItem.name, 1, 0, 'C');
                            pdf.Cell(20, 10, orderItem.quantity, 1, 0, 'C');
                            pdf.Cell(20, 10, '$ ' + orderItem.price, 1, 0, 'C');
                            pdf.Cell(30, 10, '$ ' + orderItem.subtotal, 1, 0, 'C');
                            pdf.Ln(10);
                        })
                        
                        pdf.Ln(5);

                        pdf.Cell(20, 10, 'Total : ', 0, 0);
                        pdf.Cell(100, 10, '$' + result[0]?.totalAmount, 0, 0);

                        pdf.Output('P', `invoice.pdf`);
                        res.render('orderConfirmation', { bookOrderID });

                        // var data = fs.readFileSync('./public/test.pdf');
                        // res.contentType("application/pdf");
                        // res.send(data);
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                res.redirect('/');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { printInvoice }