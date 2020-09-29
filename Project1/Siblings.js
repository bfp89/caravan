$('#btnRun').click(function() {

    $.ajax({
        url: "Siblings.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#selGeonameID').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtAsciiName').html(result['data'][0]['asciiName']);
                $('#txtCountryId').html(result['data'][0]['countryId']);
                $('#txtCountryCode').html(result['data'][0]['countryCode']);
                $('#txtContinentCode').html(result['data'][0]['continentCode']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 


});
