//initialize js serializer to serialize form data to json object
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

//general alert function
function alert(data, color) {
    $('.alert').css('display', 'block');
    $('.alert').html(data);
    $('.alert').css('background-color', color);
}

//phone number length checker function
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

// Capture form data on form submit
$("#first_form").on("submit", function (e) {
    e.preventDefault(); //prevent default form submit

    let form_data = $(this).serializeObject() //serialize form data to json object

    $.ajax({
        url: "http://developers.gictsystems.com/api/dummy/submit/",
        type: "POST",
        data: form_data,
        success: function (response) {
            alert(response.responseJSON.Message, 'green') // call general alert function passing the data and color
            setTimeout(function () {
                $('.alert').css('display', 'none');
            }, 3000) // hide alert after 3 seconds
        },
        error: function (error) {
            alert(error.responseJSON.Message, 'red')
            setTimeout(function () {
                $('.alert').css('display', 'none');
            }, 3000)
        }
    });
})

$(document).ready(function () {
    //Initialize Data table.
    let table = $('#table_list').DataTable({
        ajax: {
            //pass the destination url via proxy to sort CORS and Auth Header issues. Proxy used is (https://cors-hill-proxy.herokuapp.com)
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
            {
                data: 'Action', render: function (data, type, row) {
                    return `<button class="btn btn-warning">Edit</button>`
                }
            },
        ]
    });

    // refresh data on table on every 10 seconds
    setInterval(function () {
        console.log("refreshing")
        table.ajax.reload();

    }, 10000);

    // custom refresh of table
    $('#refresh_data').click(function () {
        table.ajax.reload();
    })

});


