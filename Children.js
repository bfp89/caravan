$('#btnRun3').click(function() {

    $.ajax({
        url: "Children.php",
        type: 'POST',
        dataType: 'json',
        data: {
            geonameId: $('#selGeonameID3').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtlat').html(result['data'][0]['lat']);
                $('#txtlng').html(result['data'][0]['lng']);
                $('#txtadminTypeName').html(result['data'][0]['adminTypeName']);
                $('#txtfclName').html(result['data'][0]['fclName']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // your error code
        }
    }); 


});