/*! simplegmaps - v2.3.1 - 2017-09-06
* https://github.com/SubZane/simplegmaps
* Copyright (c) 2017 Andreas Norman; Licensed MIT */
!function(a,b){"function"==typeof define&&define.amd?define([],b(a)):"object"==typeof exports?module.exports=b(a):a.simplegmaps=b(a)}("undefined"!=typeof global?global:this.window||this.global,function(a){"use strict";var b,c,d,e,f={},g=!!document.querySelector&&!!a.addEventListener,h=[],i=!1,j={Driving:google.maps.TravelMode.DRIVING,Bicycling:google.maps.TravelMode.BICYCLING,Transit:google.maps.TravelMode.TRANSIT,Walking:google.maps.TravelMode.WALKING},k={Metric:google.maps.UnitSystem.METRIC,Imperial:google.maps.UnitSystem.IMPERIAL},l={travelMode:j.Driving,unitSystem:k.Metric},m=new google.maps.DirectionsRenderer({draggable:!0}),n=null,o=null,p=null,q={markers:[]},r=[],s=!1,t={debug:!1,multipleInfoWindows:!1,cluster:!1,ClusterImagePathPrefix:"img/markercluster/m",geolocateLimit:10,geolocateDelay:100,GeoLocation:!1,ZoomToFitBounds:!0,jsonsource:!1,AutoComplete:!1,AutoCompleteOptions:{types:["geocode"],componentRestrictions:{country:"se"},moveMap:!1,setMarker:!1},MapOptions:{draggable:!0,zoom:7,center:"55.604981,13.003822",scrollwheel:!1,streetViewControl:!1,panControl:!0,zoomControl:!0,zoomControlOptions:{style:"DEFAULT"}},iOSAppleMapLink:"http://maps.apple.com/",iOSGoogleMapLink:"comgooglemaps://",AndroidMapLink:"https://maps.google.se/maps",WP7MapLink:"maps:",DesktopMapLink:"http://www.google.com/maps",onInit:function(){},onDestroy:function(){},onDrawMap:function(){},onSearchInit:function(){},onSearchComplete:function(){},onSearchFail:function(){},onZoomToFitBounds:function(){},onPlaceChanged:function(){},onDirectionsInit:function(){},onRouteComplete:function(){},onRouteError:function(){},onJSONConnectionFail:function(){},onJSONLoadFail:function(){},onJSONLoadSuccess:function(){}},u=function(){n=new google.maps.Geocoder,p=c.cloneNode(!0),o=new google.maps.Map(c,b.MapOptions),o.addListener("idle",function(){P("onDrawMap")})},v=function(a){if(b.jsonsource===!1)return!1;var c=new XMLHttpRequest;c.open("GET",b.jsonsource,!0),c.onload=function(){if(c.status>=200&&c.status<400){var d=w(c.response),e=d.length;d.forEach(function(b){y(b,function(c){return c===!1?(S("fetchPosition response: "+c),void e--):(S("fetchPosition response: OK: "+c),b.position=c,D(b.iconpath,b.iconpath2x,function(c){b.icon=c,q.markers.push(b),S(q.markers.length+":"+e),q.markers.length===e&&a()}),void 0)})}),P("onJSONLoadSuccess")}else b.debug&&(P("onJSONLoadFail"),console.log("An error occured when trying to load data from "+b.datasource))},c.onerror=function(){b.debug&&(P("onJSONConnectionFail"),console.log("A connection error occured when trying to access "+b.datasource))},c.send()},w=function(a){try{var b=JSON.parse(a);if(b&&"object"==typeof b&&null!==b)return b}catch(c){}return console.warn("Error parsing JSON file"),!1},x=function(a){var b=p.querySelectorAll(".map-marker"),c=Array.prototype.slice.call(b,0),d=b.length;S(b),0===b.length&&a(),c.forEach(function(b){var c={};return c.title=b.getAttribute("data-title"),b.querySelector(".map-infowindow")?(c.infoWindowContent=b.querySelector("div.map-infowindow").parentElement.innerHTML,c.CustominfoWindowContent=null):b.querySelector(".map-custom-infowindow")&&(c.CustominfoWindowContent=b.querySelector(".map-custom-infowindow").parentElement.innerHTML,c.infoWindowContent=null),b.hasAttribute("data-center")?c.center=!0:c.center=!1,b.hasAttribute("data-icon")?c.iconpath=b.getAttribute("data-icon"):c.iconpath=null,b.hasAttribute("data-icon2x")?c.iconpath2x=b.getAttribute("data-icon2x"):c.iconpath2x=null,b.hasAttribute("data-latlng")?c.latlng=b.getAttribute("data-latlng"):c.latlng=null,b.hasAttribute("data-address")?c.address=b.getAttribute("data-address"):c.address=null,null===c.address&&null===c.latlng?(S("No address or longitude/latitude found in markup. Removing marker."),void d--):void y(c,function(b){return b===!1?(S("fetchPosition response: "+b),void d--):(S("fetchPosition response: OK: "+b),c.position=b,D(c.iconpath,c.iconpath2x,function(b){c.icon=b,q.markers.push(c),S(q.markers.length+":"+d),q.markers.length===d&&a()}),void 0)})})},y=function(a,c){G(a.latlng)?c(F(a.latlng)):G(a.address)&&setTimeout(C(a,function(b,d){S("status: "+b),S("response: "+d),b===google.maps.GeocoderStatus.OVER_QUERY_LIMIT?(console.warn("google.maps.GeocoderStatus.OVER_QUERY_LIMIT"),S("-- google.maps.GeocoderStatus.OVER_QUERY_LIMIT"),S("-- Unable to geolocate address. Removing marker."),c(!1)):b===google.maps.GeocoderStatus.OK?c(d):(a.latlng=null,S(b),S("No address or longitude/latitude located from address. Removing marker."),c(!1))}),b.geolocateDelay)},z=function(){S("-- placeMarkers --"),R(q.markers,function(a,c){S(a);var d={},e=new google.maps.Marker({title:a.title,center:a.center});r.push(e),e=B(e,a),d.position=a.position,d.icon=a.icon,e.setOptions(d),b.cluster===!1&&e.setMap(o),S(e.title)}),S("--- Cluster: "+b.cluster),b.cluster===!0&&new MarkerClusterer(o,r,{imagePath:b.ClusterImagePathPrefix});var a=new google.maps.LatLngBounds;if(r.length>0)if(b.ZoomToFitBounds===!0)S("ZoomToFitBounds"),E();else{S("NO - ZoomToFitBounds");var c=r.filter(function(a){return a.center===!0||"true"===a.center});G(c)?(S("centeredmarker:",c),o.setCenter(c[0].getPosition())):o.setCenter(r[0].getPosition())}else b.MapOptions.center||o.setCenter(a.getCenter());b.GeoLocation?(S("geolocation"),N(o)):S("no geolocation")},A=function(){for(var a=0;a<h.length;a++)h[a].close()},B=function(a,d){if(d.infoWindowContent)a.addListener("click",function(){b.multipleInfoWindows===!1&&h.length>0&&A();var c=new google.maps.InfoWindow({content:d.infoWindowContent});c.open(o,a),h.push(c)});else if(d.CustominfoWindowContent){var e=d.CustominfoWindowContent;google.maps.event.addListener(a,"click",function(){var a=document.querySelector("#simplegmaps-c-iw");null!==a&&a.parentNode.removeChild(a),c.insertAdjacentHTML("afterend",'<div id="simplegmaps-c-iw"></div>'),document.querySelector("#simplegmaps-c-iw").innerHTML=e,document.querySelector("#simplegmaps-c-iw .close").addEventListener("click",function(a){a.preventDefault();var b=document.querySelector("#simplegmaps-c-iw");null!==b&&b.parentNode.removeChild(b)})})}return a},C=function(a,b){G(a.latlng)?b(F(a.latlng)):G(a.address)&&n.geocode({address:a.address},function(a,c){c===google.maps.GeocoderStatus.OK?b(c,a[0].geometry.location):c===google.maps.GeocoderStatus.OVER_QUERY_LIMIT?b(c,!1):b(c,!1)})},D=function(a,b,c){var d=new Image;null===a&&null===b||""===a&&""===b?c(null):window.devicePixelRatio>1.5&&null!==typeof b&&""!==b?(d.onload=function(){var a={url:b,size:new google.maps.Size(d.naturalWidth/2,d.naturalHeight/2),scaledSize:new google.maps.Size(d.naturalWidth/2,d.naturalHeight/2),origin:new google.maps.Point(0,0)};c(a)},d.src=b):null!==typeof a&&""!==a?(d.onload=function(){var b={url:a,size:new google.maps.Size(d.naturalWidth,d.naturalHeight)};c(b)},d.src=a):c(null)},E=function(){for(var a=new google.maps.LatLngBounds,b=0;b<r.length;++b)a.extend(r[b].getPosition());if(a.getNorthEast().equals(a.getSouthWest())){var c=new google.maps.LatLng(a.getNorthEast().lat()+.002,a.getNorthEast().lng()+.002),d=new google.maps.LatLng(a.getNorthEast().lat()-.002,a.getNorthEast().lng()-.002);a.extend(c),a.extend(d)}try{o.fitBounds(a),o.setCenter(a.getCenter()),P("onZoomToFitBounds")}catch(e){S("zoomToFitBounds failed")}},F=function(a){var b;if("string"==typeof a){var c=a.split(/,\s*/);b=new google.maps.LatLng(parseFloat(c[0]),parseFloat(c[1]))}else b=a;return b},G=function(a){return"undefined"!=typeof a&&null!==a&&""!==a&&a.length>0},H=function(){return navigator.userAgent.toLowerCase().indexOf("android")>-1},I=function(){return!!(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i))},J=function(){return!!navigator.userAgent.match(/Windows Phone/i)},K=function(){e&&null!==e.map?e.setMap(null):(e=new google.maps.TrafficLayer,e.setMap(o))},L=function(){i&&null!==i.map?i.setMap(null):(i=new google.maps.TransitLayer,i.setMap(o))},M=function(){d&&null!==d.map?d.setMap(null):(d=new google.maps.BicyclingLayer,d.setMap(o))},N=function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){var b=new google.maps.LatLng(a.coords.latitude,a.coords.longitude);o.setCenter(b)},function(){O(!0)}):O(!1)},O=function(a){S(a?"SimpleGMaps: The Geolocation service failed.":"SimpleGMaps: Your browser doesn't support geolocation.")},P=function(a){void 0!==b[a]&&b[a].call(c)},Q=function(a,b){var c={};return R(a,function(b,d){c[d]=a[d]}),R(b,function(a,d){c[d]=b[d]}),c},R=function(a,b,c){if("[object Object]"===Object.prototype.toString.call(a))for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&b.call(c,a[d],d,a);else for(var e=0,f=a.length;e<f;e++)b.call(c,a[e],e,a)},S=function(a,c,d){d="undefined"!=typeof d?d:"log",b.debug&&window.console&&("undefined"!=typeof c&&null!==c&&c.length>0?console[d](a,c):console[d](a))},T=function(a,c){var d=document.querySelector(a);s=new google.maps.places.Autocomplete(d,b.autoCompleteOptions),G(c)?s.addListener("place_changed",function(){document.querySelector(c).click()}):s.addListener("place_changed",U)},U=function(){var a=s.getPlace();a.geometry&&(b.AutoCompleteOptions.moveMap&&o.panTo(a.geometry.location),b.AutoCompleteOptions.setMarker&&new google.maps.Marker({map:o,position:a.geometry.location}),P("onPlaceChanged"))},V=function(a){n.geocode({address:a},function(a,b){b===google.maps.GeocoderStatus.OK?(o.setCenter(a[0].geometry.location),new google.maps.Marker({map:o,position:a[0].geometry.location}),P("onSearchComplete")):(S(b),P("onSearchFail"))})},W=function(a,b){S(a),n.geocode({latLng:a.getPosition()},function(a){b(a&&a.length>0?a[0].formatted_address:null)})};return f.destroy=function(){b&&(P("onDestroy"),b=null,o=null,p=null,q={markers:[]},r=[])},f.init=function(a){g&&(f.destroy(),b=Q(t,a||{}),S(b),c=document.querySelector(b.container),b.MapOptions.center&&(b.MapOptions.center=F(b.MapOptions.center)),b.MapOptions.zoom||(b.MapOptions.zoom=4),c.hasAttribute("data-json")&&(b.jsonsource=c.getAttribute("data-json")),u(),S("init"),b.jsonsource===!1?(S("getMapMarkersFromMarkup"),x(function(a){S("markers done"),z()})):(S("getMapMarkersFromJSON"),v(function(a){z()})),P("onInit"))},f.Markers={get:function(){return r}},f.Map={get:function(){return o}},f.getMarkerAddress=function(a,b){W(a,function(a){b(a)})},f.Center=function(){var a=o.getCenter();google.maps.event.trigger(o,"resize"),o.setCenter(a)},f.Search={"default":{input:"",eventButton:"",AutoComplete:!1},init:function(a){f.Search.options=Q(f.Search["default"],a||{}),f.Search.options.AutoComplete&&T(f.Search.options.input),document.querySelector(f.Search.options.eventButton).addEventListener("click",function(a){a.preventDefault(),V(document.querySelector(f.Search.options.input).value)}),document.querySelector(f.Search.options.input).addEventListener("keypress",function(a){13===a.keyCode&&V(document.querySelector(f.Search.options.input).value)}),P("onSearchInit")},initAutoComplete:function(a){T(a.input)},search:function(a){V(a)}},f.Directions={TravelModes:{get:function(){return j}},"default":{AutoComplete:!1,TravelMode:l.TravelMode,UnitSystem:l.UnitSystem,originInput:"",destination:"",eventButton:""},init:function(a){f.Directions.options=Q(f.Directions["default"],a||{}),l.TravelMode=f.Directions.options.TravelMode,l.UnitSystem=f.Directions.options.UnitSystem,document.querySelector(f.Directions.options.eventButton).addEventListener("click",function(a){f.Directions.route({origin:document.querySelector(f.Directions.options.originInput).value,destination:f.Directions.options.destination})}),f.Directions.options.AutoComplete&&T(f.Directions.options.originInput,f.Directions.options.eventButton),P("onDirectionsInit")},initAutoComplete:function(a){b.AutoComplete=!0,T(a.originInput,a.eventButton)},travelMode:{get:function(){return l.TravelMode},set:function(a){l.TravelMode=a}},unitSystem:{get:function(){return l.UnitSystem},set:function(a){l.UnitSystem=a}},route:function(a){l=Q(l,a||{});var c=new google.maps.DirectionsService;S(l),m.setMap(o),b.routeDescriptionContainer&&m.setPanel(document.querySelector(b.routeDescriptionContainer)),c.route(l,function(a,b){b===google.maps.DirectionsStatus.OK?(m.setDirections(a),P("onRouteComplete")):(S(b),P("onRouteError"))})}},f.TrafficLayer={toggle:function(){K()}},f.TransitLayer={toggle:function(){L()}},f.BicycleLayer={toggle:function(){M()}},f.GeoLocation={set:function(){N()}},f.getURL={Android:function(a){var c=b.AndroidMapLink+"?q="+a;return c},ios:function(a){var c=b.iOSAppleMapLink+"?q="+a;return c},WindowsPhone:function(a){var c=b.WP7MapLink+a;return c},Desktop:function(a){var c=b.DesktopMapLink+"?q="+a;return c},Native:function(a){var b="";return b=H()?f.getURL.Android(a):I()?f.getURL.ios(a):J()?f.getURL.WindowsPhone(a):f.getURL.Desktop(a)}},f});