<?php

ini_set('display_errors', 'On');

error_reporting(E_ALL);

	$executionStartTime = microtime(true) / 1000;

    $countryData = json_decode(file_get_contents("countryBorders.geo.json"), true);

    $border = null;

    foreach ($countryData['features'] as $feature) {

        if ($feature["properties"]['iso_a2'] == $_REQUEST['Code']) {
        
        $border = $feature;

        }
    };


	$url='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['Code'];
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$rest = json_decode($result,true);	
	
	

	$url2='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=' . $_REQUEST['Code'] . '&username=benpenny1&style=full';
	

	$ch2 = curl_init();
	curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch2, CURLOPT_URL,$url2);

	$result2=curl_exec($ch2);

	curl_close($ch2);

	$geonames = json_decode($result2,true);

	$capital = $geonames['geonames'][0]['capital'];
	$north = $geonames['geonames'][0]['north'];
	$east  = $geonames['geonames'][0]['east'];
	$south = $geonames['geonames'][0]['south'];
	$west = $geonames['geonames'][0]['west'];

	$url3='http://api.worldbank.org/v2/country/' . $_REQUEST['Code'] . '?format=json';

	$ch3 = curl_init();
	curl_setopt($ch3, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch3, CURLOPT_URL,$url3);

	$result3=curl_exec($ch3);

	curl_close($ch3);

	$worldBank = json_decode($result3,true);

	$url4='https://api-2445580194301.production.gw.apicast.io/1.0/region/country/is_eu.php?country=' . $_REQUEST['Code'] . '&app_id=c11f016a&app_key=1c828fd562ef4d59c1a177e6c1d85e98';

	$ch4 = curl_init();
	curl_setopt($ch4, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch4, CURLOPT_URL,$url4);

	$result4=curl_exec($ch4);

	curl_close($ch4);

	$apiCast = json_decode($result4,true);

	$url5='https://getfestivo.com/v2/holidays?api_key=22cb919623bfd8976e4b761cd8d3fd46&country=' . strtoupper($_REQUEST['Code']) . '&language=en&year=2020';
	$ch5 = curl_init();
	curl_setopt($ch5, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch5, CURLOPT_URL,$url5);

	$result5=curl_exec($ch5);

	curl_close($ch5);

	$holidays = json_decode($result5,true);

	$url7='https://api.covid19api.com/total/country/' . $_REQUEST['Code'] . '/status/confirmed';

	$ch7 = curl_init();
	curl_setopt($ch7, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch7, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch7, CURLOPT_URL,$url7);

	$result7=curl_exec($ch7);

	curl_close($ch7);

	$covid = json_decode($result7,true);

	
	$url8='https://api.geoapify.com/v2/places?categories=airport.international&filter=rect:' . $west . ',' . $north . ',' . $east . ',' . $south . '&limit=30&apiKey=c04f6986ce8d402f948f34996806fe98';


	$ch8 = curl_init();
	curl_setopt($ch8, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch8, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch8, CURLOPT_URL,$url8);

	$result8=curl_exec($ch8);

	curl_close($ch8);

	$airports = json_decode($result8,true);

	$url9 ='https://api.geoapify.com/v2/places?categories=natural.forest&filter=rect:' . $west . ',' . $north . ',' . $east . ',' . $south . '&limit=100&lang=en&apiKey=c04f6986ce8d402f948f34996806fe98';

	$ch9 = curl_init();
	curl_setopt($ch9, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch9, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch9, CURLOPT_URL,$url9);

	$result9=curl_exec($ch9);

	curl_close($ch9);

	$markers = json_decode($result9,true);

	$url10 ='http://api.weatherapi.com/v1/forecast.json?key=9768cea197524aff9f1151546202212&q=' . $capital . '&days=5';

	$ch10 = curl_init();
	curl_setopt($ch10, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch10, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch10, CURLOPT_URL,$url10);

	$result10=curl_exec($ch10);

	curl_close($ch10);

	$weather = json_decode($result10,true);

	$url6= 'http://newsapi.org/v2/top-headlines?country=' . $_REQUEST['Code'] . '&apiKey=c5543d7647934d5fb97991e28fadd384';

	$ch6 = curl_init();
	curl_setopt($ch6, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch6, CURLOPT_URL,$url6);

	$result6=curl_exec($ch6);

	curl_close($ch6);

	$news = json_decode($result6,true);



	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['border'] = $border;
	$output['data']['rest'] = $rest;
	$output['data']['geonames'] = $geonames['geonames'];
	$output['data']['worldBank'] = $worldBank;
	$output['data']['apiCast'] = $apiCast;
	$output['data']['holidays'] = $holidays['holidays'];
	$output['data']['covid'] = end($covid);
	$output['data']['airports'] = $airports;
	$output['data']['markers'] = $markers;
	$output['data']['weather'] = $weather;
	$output['data']['news'] = $news;

	unset($rest['alpha3code']);
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>