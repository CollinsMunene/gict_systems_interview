$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function alert(data, color) {
    $('.alert').css('display', 'block');
    $('.alert').html(data);
    $('.alert').css('background-color', color);
}

function checkLength() {
    var length = $("#phone").val().length;
    if (length > 10) {
        $('.alert').css('display', 'block');
        alert("Phone number must be 10 digits", '#ff9800');
        $("#form_submit").attr("disabled", true);

    } else {
        $('.alert').css('display', 'none');
        $("#form_submit").removeAttr("disabled");
    }
}

$("#first_form").on("submit", function (e) {
    e.preventDefault();

    let form_data = $(this).serializeObject()
    console.log(form_data)

    $.ajax({
        url: "http://developers.gictsystems.com/api/dummy/submit/",
        type: "POST",
        data: form_data,
        success: function (response) {
            alert(response.responseJSON.Message, 'green')
            setTimeout(function () {
                $('.alert').css('display', 'none');
            }, 2000)
        },
        error: function (error) {
            alert(error.responseJSON.Message, 'red')
            setTimeout(function () {
                $('.alert').css('display', 'none');
            }, 2000)
        }
    });
})

//document ready
$(document).ready(function () {
    let table = $('#table_list').DataTable( {
        ajax: {
            url: 'https://cors-hill-proxy.herokuapp.com/http://developers.gictsystems.com/api/dummy/items/',
            type: 'GET',
            contentType: 'text/plain',
            dataSrc: '',
            headers: {
                "Authorization": "Bearer ALDJAK23423JKSLAJAF23423J23SAD3"
            },
        },
        columns: [ 
            { data: 'ID' },
            { data: 'Message' },
            { data: 'Age' },
            { data: 'Action', render: function (data, type, row) {
                return `<button class="btn btn-warning">Edit</button>`
            }
            },
        ]
    } );

    setInterval( function () {
        console.log("refreshing")
        table.ajax.reload();
    }, 10000 );

});


