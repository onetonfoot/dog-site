$('#formDogModal .modal-title').text('Update dog information');
$('#dog_photos').parent().children().remove();

const updateFormSelect = (elmID, key) => {
    for (let x = 1; x <= $('#' + elmID + ' option').length; x++) {
        if ($('#' + elmID + ' option:nth-child(' + x + ')').html() === key) {
            $('#' + elmID + ' option:nth-child(' + x + ')').attr({
                selected: "selected"
            });
        }
    }
};

// Auto-fill dog info into form
$.get("/dog" + window.location.pathname).done(dogJson => {
    $('#dog_name').val(dogJson.name);
    $('#dog_breed').val(dogJson.breed);
    updateFormSelect('dog_sex', dogJson.sex);
    updateFormSelect('dog_age', dogJson.age.toString());
    updateFormSelect('dog_size', dogJson.size);
    $('#dog_des').val(dogJson.description);

    // Send updated form
    $('#dog_form').submit(function (event) {
        event.preventDefault();

        let formData = new FormData(this);
        formData.append('dog_ID', dogJson._id)

        // if (!$('#dog_des').val() || !$('#dog_photos').val()) {
        //     if (!$('#form_3 .alert-danger').length) {
        //         $('#form_3').append(alert)
        //     }
        // }

        //if ($('#dog_des').val() && $('#dog_photos').val() && $('#dog_photos').get(0).files.length <= 5) {
            $.ajax({
                type: "PUT",
                url: 'http://localhost:8080/dog/registration',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (dog) {
                    $('#dogName').html(dog.name);
                    $('#dogBreed').html(dog.breed);
                    $('#dogSex').html(dog.sex);
                    $('#dogAge').html(dog.age);
                    $('#dogSize').html(dog.size);
                    $('#dogDescription').html(dog.description.replace(/\n/g, '<br>'))
                    $('#formDogModal').modal('hide')
                    $('#form_1').removeClass('hide')
                    $('#form_2').addClass('hide')
                    $('#form_3').addClass('hide')
                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });
        //}
    });
});

