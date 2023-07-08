
$(document).ready(function () {
    let sum = calcSum();

    $('.App_title_amount').text('$' + parseFloat(sum).toFixed(2))
    function checkEmty() {
        Amount = $('.App_title_amount').text().trim().split("$")[1]
        console.log("amount"+parseFloat(Amount))
        if (parseFloat(Amount) == 0) {
            $('.EmptyBlock').show()
        } else {


            $('.EmptyBlock').hide()
        }
    }

    function calcSum() {
        var cartItems = document.querySelectorAll('.cart_items')
        var totalsum = 0;
        cartItems.forEach(function (e) {
            var id = e.id;
            console.log("id:"+id)
            var price = parseFloat($(`#${id} .Cart_itemPrice`).text().split("$")[1])
            var quantity = parseFloat($(`#${id} .Cart_itemCountNumber`).text())
            totalsum = parseFloat(totalsum) + price * quantity;
            totalsum = parseFloat(totalsum).toFixed(2)
        });

        return totalsum
    }

    $('.addItem').off()
    $('.addItem').click(async function (e) {
        e.preventDefault()
        console.log('++')
        var id = $(this).attr('pro-id')
        var quantity = $(`#p${id} .Cart_itemCountNumber`).text()
        console.log(quantity)
        quantity = parseInt(quantity) + 1;
        console.log("quantity" + quantity)
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)

        let sum = calcSum();
        $('.App_title_amount').text('$' + sum)
        checkEmty()
        console.log("quantity" + quantity)
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id: id,
                quantity: quantity
            },
            success: function (response) {
                console.log("success")
            }
        });

        // await $.ajax({
        //     type: "get",
        //     url: "/calc-totalsum",
        //     success: function (response) {
        //         console.log(response['totalsum'])
        //         $('.App_title_amount').text('$'+response['totalsum'])
        //         checkEmty()
        //     }
        // });


    });
    $('.delItem').off()
    $('.delItem').click(async function (e) {
        e.preventDefault()
        console.log("script")
        console.log('++')
        var id = $(this).attr('pro-id')
        var quantity = $(`#p${id} .Cart_itemCountNumber`).text()
        quantity = parseInt(quantity) - 1;
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)
        let sum = calcSum();
        $('.App_title_amount').text('$' + sum)
        checkEmty()
        if (quantity <= 0) {
            $(`[key=${id}] .temp_item_add_button`).show()
            $(`[key=${id}] .temp_add_button`).hide()
            $(`[key=${id}] .item_add_button_inactive`).hide()
            $(`#p${id}`).remove()
        }
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id: id,
                quantity: quantity
            },
            success: function (response) {

            }
        });
        // await $.ajax({
        //     type: "get",
        //     url: "/calc-totalsum",
        //     success: function (response) {
        //         console.log(response['totalsum'])
        //         $('.App_title_amount').text('$'+response['totalsum'])
        //         checkEmty()
        //     }
        // });

    });
    $('.Cart_itemRemove').off()
    $('.Cart_itemRemove').click(async function (e) {
        e.preventDefault()
        console.log('+')
        var id = $(this).attr('pro-id')
        var quantity = 0
        $(`#p${id} .Cart_itemCountNumber`).text(quantity)
        console.log(quantity)

        if (quantity <= 0) {
            $(`[key=${id}] .temp_item_add_button`).show()
            $(`[key=${id}] .temp_add_button`).hide()
            $(`[key=${id}] .item_add_button_inactive`).hide()
            $(`#p${id}`).remove()
        }
        let sum = calcSum();
        $('.App_title_amount').text('$' + sum)
        checkEmty()
        console.log("quantity"+ quantity)
        await $.ajax({
            type: "get",
            url: "/set-quantity",
            data: {
                id: id,
                quantity: quantity
            },
            success: function (response) {

            }
        });
        // await $.ajax({
        //     type: "get",
        //     url: "/calc-totalsum",
        //     success: function (response) {
        //         console.log(response['totalsum'])
        //         $('.App_title_amount').text('$'+response['totalsum'])
        //         checkEmty()
        //     }
        // });
    });

})
