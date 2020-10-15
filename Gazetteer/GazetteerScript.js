//The Map
var mymap = L.map('mapid').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
tileSize: 512,
zoomOffset: -1,
accessToken: 'pk.eyJ1IjoiYmVucDExIiwiYSI6ImNrZnM2ZGdzZTA2OHQyc2xyZjl6YWppancifQ.AeFqdkNbl4h_JnvtqBEhfw'
}).addTo(mymap);


//Geolocator
mymap.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(mymap)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(mymap);
};

mymap.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
};

map.on('locationerror', onLocationError);

//Button for API info 
$('#showWeather').click(function() {

    $.ajax({
        url: "Gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: $('#whichCountry').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#weather').html(result['data'][0]['weather.main']);
                $('#temperature').html(result['data'][0]['main.temp']);
                $('#feelsLike').html(result['data'][0]['main.feels_like']);
                $('#txtContinentCode').html(result['data'][0]['continentCode']);

            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
            //error code
        }
    }); 


});

