//The Map
var border;

var accessToken = 'pDk51Jyy8fCzTEUyBtiVK6JFWeZBw42hZX6oB9blyKQ4tVGLEjfHbh7dOFTy4JwE';
var map = L.map('mapid');


    L.tileLayer(
      `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${accessToken}`, {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
        maxZoom: 10
      }
    ).addTo(map);

    L.easyButton('fa-star', function(btn, map){
        $('#travelInfo').modal('show')
    }).addTo(map);

    L.easyButton('fa-star', function(btn, map){
        $('#geogInfo').modal('show')
    }).addTo(map);

    L.easyButton('fa-star', function(btn, map){
        $('#factsInfo').modal('show')
    }).addTo(map);

    L.easyButton('fa-star', function(btn, map){
        $('#holidaysInfo').modal('show')
    }).addTo(map);
       
//Select country - function


$('#whichCountry').change(function() {
                
    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha2Code: $('#whichCountry').val()
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
                $('#txtLang').html(result['data']['rest']["languages"][0]["name"]);
                $('#txtCurr').html(result['data']['rest']["currencies"][0]["name"]);
                $('#txtZone').html(result['data']['rest']["timezones"]);
                $('#txtCall').html(result['data']['rest']["callingCodes"]);

                $('#txtName2').html(result['data']['rest']["name"]);
                $('#txtCapital').html(result['data']['rest']["capital"]);
                $('#txtPop').html(result['data']['rest']["population"]);
                $('#txtArea').html(result['data']['geonames'][0]["areaInSqKm"]);
                $('#txtCont').html(result['data']['worldBank'][1][0]["region"]["value"]);
                
                $('#txtName3').html(result['data']['rest']["name"]);
                $('#txtIncome').html(result['data']['worldBank'][1][0]["incomeLevel"]["value"]);
                $('#txtEu').html(result['data']['apiCast']["result"]);
                $('#imgFlag').attr({"src": result['data']['rest']["flag"], "width": "25%", "height": "10%"});
                
            };

            if (result['data']['apiCast']["result"] == false) {

                $('#txtEu').html("False");
            };

            
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
                    let latGeo = position.coords.latitude;
                    let lngGeo = position.coords.longitude;

                    $.ajax({
                        url: "libs/php/countryCodes.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            latGeo: latGeo, 
                            lngGeo: lngGeo
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

$('#holidayButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            day: $('#dayDate').val(),
            month: $('#monthDate').val(),
            year: $('#yearDate').val()
        },
        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtName4').html(result['data']['rest']["name"]);
                $('#txtHol').html(result['data']['holidays'][0]["name"]);
                $('#txtHolDate').html(result['data']['holidays'][0]["date"]);
                $('#txtHolDay').html(result['data']['holidays'][0]["week_day"]);
                $('#txtHolType').html(result['data']['holidays'][0]["type"]);

                if (result['data']['holidays'][0] == null) {
                    $('#txtHol').html("No holidays on selected date");
                    $('#txtHolDate').html("No holidays on selected date");
                    $('#txtHolDay').html("No holidays on selected date");
                };
            }
        },
    });
});
