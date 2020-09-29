$('#btnRun2').click(function() {

    $.ajax({
        url: "Neighbours.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#selGeonameID2').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtcountryCode').html(result['data'][0]['countryCode']);
                $('#txttoponymName').html(result['data'][0]['toponymName']);
                $('#txtpopulation').html(result['data'][0]['population']);
                $('#txtfcodeName').html(result['data'][0]['fcodeName']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 


});