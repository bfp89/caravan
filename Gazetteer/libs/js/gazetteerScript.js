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

//Button for API info 

/*var myPopup = L.popup().setContent(
    'Hi Hannah!'
);

L.easyButton('fa-globe', function(btn, map){
   myPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);

/*L.easyButton('fa-globe fa-lg', function(btn, map){

    


}).addTo(map);*/

//Select country - function
 

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

    $.ajax({
        url: "libs/php/countryBorders.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {
            console.log(result);

            $('#whichCountry').change()
        },
    });

});

L.geoJSON().addTo(map);
