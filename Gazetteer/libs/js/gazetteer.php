<?php

	$executionStartTime = microtime(true) / 1000;

	$url='https://restcountries.eu/rest/v2/alpha/' . $_REQUEST['alpha2Code'];
	

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$rest = json_decode($result,true);	

	$url2='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=' . $_REQUEST['countryCode'] . '&username=benpenny1&style=full';

	$ch2 = curl_init();
	curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch2, CURLOPT_URL,$url2);

	$result2=curl_exec($ch2);

	curl_close($ch2);

	$geonames = json_decode($result2,true);





	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "mission saved";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['rest'] = $rest;
	$output['data']['geonames'] = $geonames;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>