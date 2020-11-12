//The Map
var map = L.map('mapid').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiYmVucDExIiwiYSI6ImNrZnM2ZGdzZTA2OHQyc2xyZjl6YWppancifQ.AeFqdkNbl4h_JnvtqBEhfw'
}).addTo(map);


//Navigator
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
};

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
};

map.on('locationerror', onLocationError);



//Select country - function

var border;

$(document).ready(function() {

    

    $.ajax({
        url: "libs/php/selectCountry.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

            console.log(result);

            $('#whichCountry').html('');



            $.each(result.data, function(index) {
            
                
            
                $('#whichCountry').append($("<option>", {
            
                    value: result.data[index].code,
            
                    text: result.data[index].name
            
                })); 
            
            }); 
        },
        
    });
    $('#whichCountry').change(function() {
                
        $.ajax({
            url: "libs/php/countryBorders.php",
            type: 'POST',
            dataType: 'json',
            data: {
                iso_a3: $('#whichCountry').val()
            },
            
            success: function(result) {
                console.log(result);

                if (map.hasLayer(border)) {

                    map.removeLayer(border);

                };


                border = L.geoJson(result.data,{

                    color: '#ff7800',

                    weight: 6,

                    opacity: 0.65

                }).addTo(map);         


                map.fitBounds(border.getBounds());

                
                }

        });
        
        
    });

//Select country - style

    $('.js-example-responsive').select2({
        width: 'resolve'
    });

});

//Button for API info 

$('#infoButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha3Code: $('#whichCountry').val()
        },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtCapital').html(result['data'][0]['capital']);
                $('#txtLang').html(result['data'][0]['languages.name']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            "info not found"
        },
    }); 


});





