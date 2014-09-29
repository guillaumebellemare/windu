// JavaScript Document
var map;
var quebec = new google.maps.LatLng(46.826325, -71.228224);
var mc;
var map_bounds;
var init = false;
var info;
$(document).ready(function() {
	if (!init) initializeMap(true);
})

function getJSvars(script_name, var_name, if_empty) {
	
	var script_elements = document.getElementsByTagName('script');
	if (if_empty == null) {
		var if_empty = '';
	}
	for (a = 0; a < script_elements.length; a++) {
		var source_string = script_elements[a].src;
		if (source_string.indexOf(script_name) >= 0 ) {
			var_name = var_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex_string = new RegExp("[\\?&]" + var_name + "=([^&#]*)");
			var parsed_vars = regex_string.exec(source_string);
			if (parsed_vars == null) {
				return if_empty;
			} else {
				return parsed_vars[1];
			}
		}
	}
}

function initializeMap(centering) {
	var stylez = [{
		featureType: "all",
		stylers: [{
			saturation: -100
		}]
	}];
	var mapOptions = {
		zoom: 11,
		center: quebec,
		mapTypeControl: false,
		panControl: false,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.TOP_LEFT
		},
		scaleControl: true,
		streetViewControl: false
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	var styledMapOptions = {
		map: map,
		name: "tips4phpHip-Hop"
	}
	var testmap = new google.maps.StyledMapType(stylez, styledMapOptions);
	map.mapTypes.set('tips4php', testmap);
	map.setMapTypeId('tips4php');
	var clusterStyles = [{
		textColor: '#ffffff',
		anchor: [0, 0],
		url: getJSvars('google.map', 'base') + 'images/common/cluster-icon.png',
		height: 29,
		width: 24,
	}];
	mcOptions = {
		styles: clusterStyles
	};
	mc = new MarkerClusterer(map, null, mcOptions);
	// onClick OVERRIDE
	mc.onClick = function(e, test) {
		return multiChoice(e);
	}
	map_bounds = new google.maps.LatLngBounds();
	//Load all markers
	loadMarkers();
	init = true;
}

function multiChoice(mc) {
	var cluster = mc.cluster_;
	// if more than 1 point shares the same lat/long
	// the size of the cluster array will be 1 AND
	// the number of markers in the cluster will be > 1
	// REMEMBER: maxZoom was already reached and we can't zoom in anymore
	if (cluster.markers_.length > 1) {
		var markers = cluster.markers_;
		var html = '';
		html += '<div id="infoWin">';
		html += '<p><em>Il y a ' + markers.length + ' logements à cette adresse:</em></p>';
		html += '<p class="map-title">' + markers[0].locationObj[2] + '</p>' + '<p class="map-location">' + markers[0].locationObj[3] + '<br />' + markers[0].locationObj[9] + ', ' + markers[0].locationObj[7] + ', ' + markers[0].locationObj[6] + '</p>'
		html += '<div class="tab_content">';
		html += '<ul class="addrlist">';
		console.log(markers[0].locationObj)
		for (var i = 0; i < markers.length; i++) {
			html += '<li><a id="p' + markers[i].locationObj[0] + '" href="' + markers[i].locationObj[1] + '" rel="' + i + '">#' + markers[i].locationObj[12] + ' (' + markers[i].locationObj[13] + ', ' + markers[i].locationObj[14] + '$)</a></li>';
		}
		html += '</ul>';
		html += '</div>';
		html += '</div>';
		// I'm re-using the same global InfoWindow object here
		info.close();
		$('#infoWin').remove();
		$(html).appendTo('body');
		info.setContent(document.getElementById('infoWin'));
		info.open(map, markers[0]);
		// bind a click event to the list items to popup an InfoWindow
		$('ul.addrlist li').click(function() {
			var p = $(this).find("a").attr("rel");
			return infopop(markers[p]);
		});
		return false;
	}
	return true;
}

function showAddress(infowindow, locationObj, i) {
	var marker;
	var markericon = new google.maps.MarkerImage(getJSvars('google.map', 'base') + 'images/common/' + 'marker' + '.png', new google.maps.Size(44, 40), new google.maps.Point(0, 0), new google.maps.Point(13, 40));
	var shadow = new google.maps.MarkerImage(getJSvars('google.map', 'base') + 'images/common/' + 'marker' + '.png', new google.maps.Size(38, 8), new google.maps.Point(0, 0), new google.maps.Point(19, 38));
	var shape = {
		coord: [1, 1, 1, 60, 50, 60, 50, 1],
		type: 'poly'
	};
	//var markericon = 'marker';
	marker = new google.maps.Marker({
		"position": new google.maps.LatLng(locationObj[4], locationObj[5]),
		"icon": markericon,
		"map": map,
		"shape": shape,
		"shadow": shadow
	});
	marker.locationObj = locationObj;
	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
			if (locationObj[1] != "") {
				infowindow.setContent('<p class="map-title">' + locationObj[2] + '</p>' + '<p class="map-location">' + locationObj[3] + '<br />' + locationObj[7] + ', ' + locationObj[9] + ', ' + locationObj[6] + '<br><a href="' + locationObj[1] + '">Voir la fiche</a></p>');
			} else {
				infowindow.setContent('<p class="map-title">' + locationObj[2] + '</p>' + '<p class="map-location">' + locationObj[3] + '<br />' + locationObj[7] + ', ' + locationObj[9] + '<br>' + locationObj[6] + '</p>');
			}
			infowindow.setPosition(marker.getPosition());
			infowindow.open(map, this);
			marker.setZIndex(100);
		}
	})(marker, i));
	locationObj[11] = marker;
	mc.addMarker(marker);
	map_bounds.extend(marker.getPosition());
	map.fitBounds(map_bounds);
	//Si on affiche la map pour seulement avoir les bureaux MSI
	if (locationObj[0] == '-1') map.setZoom(14);
	//if selected, center on it.
	if (locationObj[10] == true) {
		setTimeout(function() {
			map.setZoom(14);
		}, 500);
	}
}

function findLatAndLng(geocoder, infowindow, locationObj, i, retry) {
	var toGeocode = locationObj[3] + ', ' + locationObj[9] + ', ' + locationObj[7];
	if (!toGeocode) toGeocode = locationObj[2];
	geocoder.geocode({
		"address": toGeocode
	}, function(results, status) {
		if (status == 'OK') {
			if (getAddressComponent(results[0].address_components, 'street_number', 'long_name')) locationObj[3] = getAddressComponent(results[0].address_components, 'street_number', 'long_name') + ', ' + getAddressComponent(results[0].address_components, 'route', 'long_name') // Address
			locationObj[4] = results[0].geometry.location.lat(); //Lat
			locationObj[5] = results[0].geometry.location.lng(); //Long
			if (locationObj[6] == '') locationObj[6] = getAddressComponent(results[0].address_components, 'postal_code', 'long_name');
			locationObj[7] = getAddressComponent(results[0].address_components, 'administrative_area_level_1')
			locationObj[8] = getAddressComponent(results[0].address_components, 'country')
			if (locationObj[9] == '') locationObj[9] = getAddressComponent(results[0].address_components, 'locality', 'long_name')
			else $.post(getJSvars('google.map', 'base') + "savegeo.ajax.php", {
				id: locationObj[0],
				lat: locationObj[4],
				lng: locationObj[5],
				location: locationObj[3],
				location_city: locationObj[9],
				postal_code: locationObj[6],
				country: locationObj[8],
				state: locationObj[7]
			}, function(results) {
				//console.log(results);
			});
			showAddress(infowindow, locationObj, i);
		} else {
			if (status != 'ZERO_RESULTS' && retry <= 100) findLatAndLng(geocoder, infowindow, locationObj, i, retry++);
		}
	})
}

function getAddressComponent(addr, searchedType, length) {
	if (!length) length = 'short_name';
	for (var i in addr) {
		if (addr[i].types[0] == searchedType) return addr[i][length];
	}
}

function loadMarkers() {
	var infowindow = new google.maps.InfoWindow({
		maxWidth: 425,
		pixelOffset: new google.maps.Size(-10, -5, 'px', 'px')
	});
	info = infowindow;
/*
	google.maps.event.addListener(infowindow, "domready", function() {   
	
	  setTimeout(function(){$("img[src$='iws3.png']").hide();},10);
	
	});
*/
	var geocoder = new google.maps.Geocoder();
	for (var i = locations.length - 1; i >= 0; i--) {
		if (!locations[i][4] || !locations[i][5]) {
			findLatAndLng(geocoder, infowindow, locations[i], i);
		} else {
			showAddress(infowindow, locations[i], i);
		}
	}
}