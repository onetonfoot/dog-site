$('#formDogModal .modal-title').text('Register a dog');

$('#dog_form').submit(function (event) {
    event.preventDefault();

    if (!$('#dog_des').val() || !$('#dog_photos').val()) {
        if (!$('#form_3 .alert-danger').length) {
            $('#form_3').append(alert)
        }
    }

    if ($('#dog_des').val() && $('#dog_photos').val() && $('#dog_photos').get(0).files.length <= 5) {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8080/dog/registration',
            data: new FormData(this),
            // contentType: 'application/json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("A new dog");
                console.log(data);
                let s = createDogCard(data);
                $('#dogs').append(s)
                $('#formDogModal').modal('hide')
                $('#dog_form input, #dog_form textarea').val('');
                $('#form_1').removeClass('hide')
                $('#form_2').addClass('hide')
                $('#form_3').addClass('hide')
            },
            error: function (data) {
                console.log("error");
                console.log(data);

            }
        });
    }
    
});