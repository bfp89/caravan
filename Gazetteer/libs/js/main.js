//The Map
var border;

var accessToken = 'pDk51Jyy8fCzTEUyBtiVK6JFWeZBw42hZX6oB9blyKQ4tVGLEjfHbh7dOFTy4JwE';

var streetMap = `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${accessToken}`;

var layerOne = L.tileLayer(streetMap, {
    minZoom: 1,
    maxZoom: 22,
    maxNativeZoom: 18
});


var map = L.map('mapid', {

    center: [0,0],
    zoom: 12,
    zoomSnap: 0.2,
    zoomDelta: 0.2,
    layers: [layerOne],
    tap: true,
    attributionControl: true,
    zoomControl: true,
    doubleClickZoom: true,
    keyboard: true

});

// var cityIcon = L.icon({
//     iconUrl: 'img/city.png',
//     shadowUrl: 'img/city2.png',

//     iconSize:     [38, 95], // size of the icon
//     shadowSize:   [50, 64], // size of the shadow
//     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//     shadowAnchor: [4, 62],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });

var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

L.easyButton('fa-plane', function(btn, map){
    $('#travelInfo').modal('show')
}).addTo(map);

L.easyButton('fa-globe-americas', function(btn, map){
    $('#geogInfo').modal('show')
}).addTo(map);

L.easyButton('fa-question-circle', function(btn, map){
    $('#factsInfo').modal('show')
}).addTo(map);

L.easyButton('fa-suitcase-rolling', function(btn, map){
    $('#holidaysInfo').modal('show')
}).addTo(map);

L.easyButton('fa-newspaper', function(btn, map){
    $('#newsInfo').modal('show')
}).addTo(map);

L.easyButton('fa-virus', function(btn, map){
    $('#covidInfo').modal('show')
}).addTo(map);
       
//Select country - function


$('#whichCountry').change(function() {

    var centerMap = map.getCenter();

    var latMap = centerMap.latitude;

    var lonMap = centerMap.longitude;

    console.log(centerMap);
    console.log(lonMap);
    console.log(latMap);
                
    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            Code: $('#whichCountry').val(),
            lon: lonMap,
            lat: latMap
        },
        
        success: function(result) {
            console.log(result);

            if (map.hasLayer(border)) {

                map.removeLayer(border);

            };


            border = L.geoJson(result.data.border,{

                color: '#ff7800',

                weight: 6,

                opacity: 0.65

            }).addTo(map);         


            map.fitBounds(border.getBounds());

            if (result.status.name == "ok") {

                $('#txtName').html(result['data']['rest']["name"]);
                
                $('#txtCurr').html(result['data']['rest']["currencies"][0]["name"]);
                $('#txtZone').html(result['data']['rest']["timezones"]);
                $('#txtCall').html(result['data']['rest']["callingCodes"]);

                $('#txtName2').html(result['data']['rest']["name"]);

                let index = 0;
                let langs = [];
                while (index < result['data']['rest']["languages"].length) {
                    
                    langs.push(result['data']['rest']["languages"][index]["name"]);
                    $('#txtLang').html(langs);
                    langs.join(', ');
                    index += 1;
                }

                $('#txtCapital').html(result['data']['rest']["capital"]);
                $('#txtPop').html(result['data']['rest']["population"]);
                $('#txtArea').html(result['data']['geonames'][0]["areaInSqKm"]);
                $('#txtCont').html(result['data']['worldBank'][1][0]["region"]["value"]);
                
                $('#txtName3').html(result['data']['rest']["name"]);
                $('#txtIncome').html(result['data']['worldBank'][1][0]["incomeLevel"]["value"]);
                $('#txtEu').html(result['data']['apiCast']["result"]);
                $('#imgFlag').attr({"src": result['data']['rest']["flag"], "width": "25%", "height": "10%"});

                $('#txtName4').html(result['data']['rest']["name"]);

                var listCount;

                $.each(result['data']['holidays'], function(index) {

                    listCount++;
                    var newRow = "<tr><td>" + listCount + "</td><td>" + result['data']['holidays'][index].name + "</td><td>" + result['data']['holidays'][index].date + "</td></tr>";
                    $("#myTable").append(newRow);
                   

                })
                

                $('#txtName5').html(result['data']['rest']["name"]);
                $('#txtPaper1').html(result['data']['news']["articles"][0]["source"]["name"]);
                $('#txtPaper2').html(result['data']['news']["articles"][1]["source"]["name"]);
                $('#txtPaper3').html(result['data']['news']["articles"][2]["source"]["name"]);
                $('#txtLink1').html(result['data']['news']["articles"][0]["title"]);
                $('#txtLink2').html(result['data']['news']["articles"][1]["title"]);
                $('#txtLink3').html(result['data']['news']["articles"][2]["title"]);
                $('#txtLink1').attr({"href": result['data']['news']["articles"][0]["url"]});
                $('#txtLink2').attr({"href": result['data']['news']["articles"][1]["url"]});
                $('#txtLink3').attr({"href": result['data']['news']["articles"][2]["url"]});      
                

                $('#txtName6').html(result['data']['rest']["name"]);
                $('#txtCases').html(result['data']['covid'][result['data']['covid'].length - 1]["Cases"]);
                
            };

            if (result['data']['apiCast']["result"] == false) {

                $('#txtEu').html("False");
            } else {
                $('#txtEu').html("True");
            };

            var cityList;

            $.each(result['data']['cities']['data'], function(index) {

                cityList++;
                var marker = L.circle([result['data']['cities']['data'][index].latitude, result['data']['cities']['data'][index].longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);


                
            });

            var hotelList;

            $.each(result['data']['accomodation']['features'], function(index) {

                hotelList++;
                var marker2 = L.circle([result['data']['accomodation']['features'][index].properties.lon, result['data']['accomodation']['features'][index].properties.lat], {
                    color: 'green',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(map);
            });
            
        },

    });
    
    
});

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

            //Navigator
            if ('geolocation' in navigator){
                navigator.geolocation.getCurrentPosition(function(position) {
                    let lngGeo = position.coords.longitude;
                    let latGeo = position.coords.latitude;
                    

                    $.ajax({
                        url: "libs/php/countryCodes.php",
                        type: 'POST',
                        dataType: 'json',
                        data: { 
                            lngGeo: lngGeo,
                            latGeo: latGeo
                        },
                        success: function(result) {
                            
                            console.log(result.data);

                            $('#whichCountry').val(result.data.countryCode).change();
                        },
    
                    });       
                });
                
            };
                
        },
        
    });
    
});

