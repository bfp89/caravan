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
                iso_a2: $('#whichCountry').val()
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

//Buttons for API info 

//Travel

$('#travelButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha2Code: $('#whichCountry').val()
        },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtName').html(result['data']['rest']["name"]);
                $('#txtLang').html(result['data']['rest']["languages"][0]["name"]);
                $('#txtCurr').html(result['data']['rest']["currencies"][0]["name"]);
                $('#txtZone').html(result['data']['rest']["timezones"]);
                $('#txtCall').html(result['data']['rest']["callingCodes"]);
                         
            };
        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log("info not found");
        },
    }); 


});

//Geography

$('#geogButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha2Code: $('#whichCountry').val()
        },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtName2').html(result['data']['rest']["name"]);
                $('#txtCapital').html(result['data']['rest']["capital"]);
                $('#txtPop').html(result['data']['rest']["population"]);
                $('#txtArea').html(result['data']['geonames'][0]["areaInSqKm"]);
                $('#txtCont').html(result['data']['worldBank'][1][0]["region"]["value"]);
                
                
            };
        
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log("info not found");
        },
    }); 


});


//Country Facts 

$('#factsButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha2Code: $('#whichCountry').val()
        },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtName3').html(result['data']['rest']["name"]);
                $('#txtIncome').html(result['data']['worldBank'][1][0]["incomeLevel"]["value"]);
                $('#txtEu').html(result['data']['apiCast']["result"]);
                $('#imgFlag').attr({"src": result['data']['rest']["flag"], "width": "25%", "height": "10%"});

            };
        if (result['data']['apiCast']["result"] == false) {

            $('#txtEu').html("False");
        };
        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log("info not found");
        },
    }); 


});

//National Holidays

$('#holidayButton').click(function() {

    $.ajax({
        url: "libs/php/gazetteer.php",
        type: 'POST',
        dataType: 'json',
        data: {
            alpha2Code: $('#whichCountry').val(),
            day: $('#dayDate').val(),
            month: $('#monthDate').val(),
            year: $('#yearDate').val()
        },

        success: function(result) {

            console.log(result);

            if (result['data']['holidays'][0] == null) {
                $('#txtHol').html("No holidays on selected date");
                $('#txtHolDate').html("No holidays on selected date");
                $('#txtHolDay').html("No holidays on selected date");
            };

            if (result.status.name == "ok") {

                $('#txtName4').html(result['data']['rest']["name"]);
                $('#txtHol').html(result['data']['holidays'][0]["name"]);
                $('#txtHolDate').html(result['data']['holidays'][0]["date"]);
                $('#txtHolDay').html(result['data']['holidays'][0]["week_day"]);
                $('#txtHolType').html(result['data']['holidays'][0]["type"]);


            };
        },

        error: function(jqXHR, textStatus, errorThrown,) {
            console.log("info not found");
        },
    }); 


});