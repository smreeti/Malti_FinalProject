$(document).ready(() => {

    $(".orderStatus").click((e) => {
        let bookOrderDetails = JSON.parse($("#bookOrderDetails").val());
        let orderItemAndOrderStatus = $(e.target).attr('state');
        let orderItemSplit = orderItemAndOrderStatus.split('|');
        const bookOrderItemID = orderItemSplit[0];
        const orderItemStatus = orderItemSplit[1];
        const orderItemStatusCode = orderItemSplit[2];

        bookOrderDetails.orderItems = bookOrderDetails.orderItems.map(bookOrderItem => {

            if (bookOrderItem.orderItemID == bookOrderItemID) {
                bookOrderItem.orderStatusID = Number(orderItemStatus);
                bookOrderItem.orderStatus = orderItemStatusCode;
            }
            return bookOrderItem;
        });

        $("#bookOrderDetails").val(JSON.stringify(bookOrderDetails));

        console.log(bookOrderDetails)
    })
})



