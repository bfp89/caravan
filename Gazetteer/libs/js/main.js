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




L.easyButton('fa-passport', function(btn, map){
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

L.easyButton('fa-cloud-sun-rain', function(btn, map){
    $('#weatherInfo').modal('show')
}).addTo(map);
       
//Select country - function


$('#whichCountry').change(function() {

    map.spin(true);           
    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            Code: $('#whichCountry').val()
        },
        
        success: function(result) {

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

                let borders = result['data']['rest']["borders"];

                $('#txtBorder').html(borders.join(', '));
                $('#txtCall').html(result['data']['rest']["callingCodes"]);

                
                let index = 0;
                let langs = [];
                while (index < result['data']['rest']["languages"].length) {
                    
                    langs.push(result['data']['rest']["languages"][index]["name"]);
                    $('#txtLang').html(langs.join(', '));
                    index ++;
                }

                $('#txtCapital').html(result['data']['rest']["capital"]);
                $('#txtPop').html(result['data']['rest']["population"]);
                $('#txtArea').html(result['data']['geonames'][0]["areaInSqKm"]);
                $('#txtCont').html(result['data']['worldBank'][1][0]["region"]["value"]);
                
                $('#txtName3').html(result['data']['rest']["name"]);
                $('#txtIncome').html(result['data']['worldBank'][1][0]["incomeLevel"]["value"]);
                $('#txtEu').html(result['data']['apiCast']["result"]);
                $('.imgFlag').attr({"src": result['data']['rest']["flag"], "width": "12.5%", "height": "5%"});

                $('#txtName4').html(result['data']['rest']["name"]);

                $('#myTable').html("");
                $.each(result['data']['holidays'], function(index) {
                    if (result['data']['holidays'][index].name == null) {

                    } else {
                        var newRow2 = "<tr><td>" + result['data']['holidays'][index].name + "</td><td>" + result['data']['holidays'][index].date + "</td></tr>";
                        $("#myTable").append(newRow2);
                    }
                   

                });
                   
                $('#myTable2').html("");
                $.each(result['data']['news']['articles'], function(index) {
                    var link = result['data']['news']['articles'][index]['url'];
                    var newRow2 = "<tr><td>" + (index + 1) + `</td><td><a href='${link}' target=_blank>` + result['data']['news']['articles'][index]['title'] + "</td></tr>";
                    $("#myTable2").append(newRow2);
                   

                });

                $('#txtCases').html(result['data']['covid']['Cases']);

                $('#day3').html(result['data']['weather']['forecast']['forecastday'][2]['date']);
                $('#weatherIcon1').attr({"src": result['data']['weather']['forecast']['forecastday'][0]['day']['condition']['icon']});
                $('#weatherDesc1').html(result['data']['weather']['forecast']['forecastday'][0]['day']['condition']['text']);
                $('#maxTemp1').html('Max Temp (C): ' + result['data']['weather']['forecast']['forecastday'][0]['day']['maxtemp_c']);
                $('#minTemp1').html('Min Temp (C): ' + result['data']['weather']['forecast']['forecastday'][0]['day']['mintemp_c']);
                $('#sunrise1').html('Sunrise: '+result['data']['weather']['forecast']['forecastday'][0]['astro']['sunrise']);
                $('#sunset1').html('Sunset: '+result['data']['weather']['forecast']['forecastday'][0]['astro']['sunset']);
                $('#weatherIcon2').attr({"src": result['data']['weather']['forecast']['forecastday'][1]['day']['condition']['icon']});
                $('#weatherDesc2').html(result['data']['weather']['forecast']['forecastday'][1]['day']['condition']['text']);
                $('#maxTemp2').html('Max Temp (C): ' + result['data']['weather']['forecast']['forecastday'][1]['day']['maxtemp_c']);
                $('#minTemp2').html('Min Temp (C): ' + result['data']['weather']['forecast']['forecastday'][1]['day']['mintemp_c']);
                $('#sunrise2').html('Sunrise: '+ result['data']['weather']['forecast']['forecastday'][1]['astro']['sunrise']);
                $('#sunset2').html('Sunset: '+ result['data']['weather']['forecast']['forecastday'][1]['astro']['sunset']);
                $('#weatherIcon3').attr({"src": result['data']['weather']['forecast']['forecastday'][2]['day']['condition']['icon']});
                $('#weatherDesc3').html(result['data']['weather']['forecast']['forecastday'][2]['day']['condition']['text']);
                $('#maxTemp3').html('Max Temp (C): ' + result['data']['weather']['forecast']['forecastday'][2]['day']['maxtemp_c']);
                $('#minTemp3').html('Min Temp (C): ' + result['data']['weather']['forecast']['forecastday'][2]['day']['mintemp_c']);
                $('#sunrise3').html('Sunrise: '+result['data']['weather']['forecast']['forecastday'][2]['astro']['sunrise']);
                $('#sunset3').html('Sunset: '+result['data']['weather']['forecast']['forecastday'][2]['astro']['sunset']);

                
            };

            if (result['data']['apiCast']["result"] == false) {

                $('#txtEu').html("False");
                $('#eu').attr({"class": "table-danger"});
            } else {
                $('#txtEu').html("True");
                $('#eu').attr({"class": "table-success"});
            };

            var airportIcon = L.ExtraMarkers.icon({
                icon: 'fas fa-plane-departure',
                markerColor: 'green',
                shape: 'square',
                prefix: 'fa'
              });

                $.each(result['data']['airports']['features'], function(index) {
                        airportName = result['data']['airports']['features'][index]['properties'].name;

                        L.marker([result['data']['airports']['features'][index]['properties'].lat, 
                        result['data']['airports']['features'][index]['properties'].lon], {icon: airportIcon
                        }).addTo(map).bindPopup(airportName);
                });

            map.spin(false);  
        
        },

        

    });
    
    
});

$(document).ready(function() {

    $.ajax({
        url: "libs/php/selectCountry.php",
        type: 'POST',
        dataType: 'json',
        
        success: function(result) {

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
                            
                            $('#whichCountry').val(result.data.countryCode).change();
                        },
    
                    });       
                });
                
            };
                
        },
        
    });
    
});