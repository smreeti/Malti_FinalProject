/*
    Smriti Mool (8811566)
    Malena Aguiar ((8793442)
*/
$(document).ready(function () {
    $(".increaseFont,.decreaseFont").click(function () {
        let type = $(this).val();
        let curFontSize = $('main').css('font-size');
        if (type == 'increase') {
            $('main').css('font-size', parseInt(curFontSize) + 1);
        } else {
            $('main').css('font-size', parseInt(curFontSize) - 1);
        }
    });
});