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
    $("#addBookOrderForm").submit(() => {
        let selectedBook = $('#book').val();
        let selectedBookId = $('#book :selected').attr("id");
        let selectedQuantity = parseInt($('#quantity').val());
        rowCount++;
        totalItems += (selectedQuantity);

        //show table for selected books
        $('#selectedBooks').css("display", "block");
        $('#selectedBookDetailsFooter').css("display", "block");

        $('#selectedBookDetails').append(
            `<tr>
                <td>${rowCount}</td>
                <td>${selectedBook}</td>
                <td>${selectedQuantity}</td>
            </tr>`);

        selectedBookArray.push({
            bookId: selectedBookId,
            quantity: selectedQuantity
        })
        selectedBookDetails = { totalItems, selectedBookArray }

        $('#selectedBookDetailsFooter').empty();
        $('#selectedBookDetailsFooter').append(
            `<p> Total Items : ${totalItems} </p>`
        )

        $('#bookOrderDetails').val(JSON.stringify(selectedBookDetails));
        resetFormValues();
    });

    const resetFormValues = () => {
        $('#quantity').val("");
    }
});

