/**
 * Code below is copied from
 * https://wheretheiss.at/
 * in conjunction with Leaflet Library
 * https://leafletjs.com/examples/quick-start/
 * with additional assistance from the video
 * https://www.youtube.com/watch?v=nZaZ2dB6pow&t=10s
 * to provide a map and live updates
 * to the RT-section of page.
 */

/* Code below creates a Leaflet map*/
var initialZoomLatitude = 0;
var initialZoomLongitude = 0;
var mapZoomLevel = 2;

const MY_MAP = L.map("iss-map").setView(
	[initialZoomLatitude, initialZoomLongitude],
	mapZoomLevel
);

const ATTRIBUTION =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'; // obligatory as per the copyright notice

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // url is a format of a url for any given map tile from Open Street map
const TILES = L.tileLayer(TILE_URL, { ATTRIBUTION });
TILES.addTo(MY_MAP);

/* Code below creates a marker with custom icon*/
var iconHeight = 50;
var iconWidth = 32;
var anchorHeight = 25;
var anchorWidth = 16;

var issIcon = L.icon({
	iconUrl: "SpaceStation/img/iss-map-icon.png",
	iconSize: [iconHeight, iconWidth],
	iconAnchor: [anchorHeight, anchorWidth],
});

const MARKER = L.marker([initialZoomLatitude, initialZoomLongitude], {
	icon: issIcon,
}).addTo(MY_MAP);

/** Code below fetches the information
 * from the iss api and displays it
 * on the page through Leaflet map and
 * live coordinates
 */

const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;
async function getISS() {
	const RESPONSE = await fetch(ISS_URL);
	const DATA = await RESPONSE.json();
	const { latitude, longitude, altitude, velocity } = DATA;
	var decimalAmount = 3;

	MARKER.setLatLng([latitude, longitude]);
	if (firstTime) {
		MY_MAP.setView([latitude, longitude], mapZoomLevel);
		firstTime = false;
	}

	document.getElementById("lat").textContent = latitude.toFixed(decimalAmount);
	document.getElementById("long").textContent = longitude.toFixed(
		decimalAmount
	);
	document.getElementById("alt").textContent = altitude.toFixed(decimalAmount);
	document.getElementById("vel").textContent = velocity.toFixed(decimalAmount);
}

/**
 * Code below is copied from Magnific Popup
 * https://dimsemenov.com/plugins/magnific-popup/
 * and it provides a "Lightbox Gallery" effect
 * to gallery-section
 */

$(".gallery-section .grid .test-popup-link").magnificPopup({
	type: "image",
	gallery: { enabled: true },
});

/**
 * Code below is copied from Owl Carousel
 * https://owlcarousel2.github.io/OwlCarousel2/demos/basic.html
 * and it provides a carousel effect to
 * quotes-section
 */
$(".page-main .quotes-section .owl-carousel").owlCarousel({
	loop: true,
	autoplay: true,
	dots: true,
	responsive: {
		0: {
			items: 1,
		},
		544: {
			items: 2,
		},
	},
});

$(document).ready(function () {});
getISS();
setInterval(getISS, 1000);
