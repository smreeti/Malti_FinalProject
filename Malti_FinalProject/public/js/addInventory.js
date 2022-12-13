$(document).ready(() => {
    const fetchBook = () => {
        books.forEach(book => {
            $('#book').append($('<option>', {
                value: book.name,
                text: book.name,
                id: book.bookId
            }));
        })
    }

    fetchBook();

    let rowCount = 0; //for table index
    let selectedBookArray = []; //for selected book lists and used during confirmation
    let totalItems = 0;
    let selectedBookDetails;
    $("#addBookOrder").click(() => {
        let selectedBook = $('#book').val();
        let selectedBookId = $('#book :selected').attr("id");
        let selectedQuantity = parseInt($('#quantity').val());
        rowCount++;
        totalItems += (selectedQuantity);

        //show table for selected books
        $('#selectedBooks').css("display", "block");
        $('#selectedBookDetailsFooter').css("display", "table-footer-group");
        $('#selectedBookDetails').empty();

        //if the same book is selected, simply update the quantity, else add new row
        if (selectedBookArray.filter(book => book.bookId == selectedBookId).length > 0) {
            selectedBookArray = selectedBookArray.map(selectedBooks => {
                if (selectedBooks.bookId == selectedBookId) {
                    selectedBooks.quantity += selectedQuantity;
                }
                return selectedBooks;
            });

        } else {
            selectedBookArray.push({
                bookId: selectedBookId,
                quantity: selectedQuantity
            })
        }

        selectedBookArray.forEach((selectedBooks, index) => {
            $('#selectedBookDetails').append(
                `<tr>
                            <td class ="rowIndex">${index + 1}</td>
                            <td>${selectedBooks.bookId}</td>
                            <td>${selectedBooks.quantity}</td>
                        </tr>`);

        })

        selectedBookDetails = { totalItems, selectedBookArray }

        $('#selectedBookDetailsFooter').empty();
        $('#selectedBookDetailsFooter').append(
            `<tr>
                <td colspan="3">
                  <b> Total Items : ${totalItems}  <b>
                </td>
            </tr>`
        )

        $('#bookOrderDetails').val(JSON.stringify(selectedBookDetails));
        resetFormValues();
    });

    const resetFormValues = () => {
        $('#quantity').val("");
    }
});

