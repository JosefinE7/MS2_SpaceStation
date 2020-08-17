/**
 * Code below is copied from
 * https://wheretheiss.at/
 * in conjunction with a video from the
 * channel The Coding Train
 * https://www.youtube.com/watch?v=nZaZ2dB6pow&t=10s
 * to provide a map and live updates provided by
 * the iss api to the RT-section of page.
 *
 */

const MY_MAP = L.map("iss-map").setView([0, 0], 1); // When calling functions in Leaflet library you use L.

/**  Whenever using anything based on OpenStreetMap, 
an attribution is obligatory as per the copyright notice. */
const ATTRIBUTION =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILES = L.tileLayer(TILE_URL, { ATTRIBUTION });
TILES.addTo(MY_MAP);

/* Code below creates a marker with custom icon*/
var issIcon = L.icon({
	iconUrl: "SpaceStation/img/iss-map-icon.png",
	iconSize: [50, 32],
	iconAnchor: [25, 16],
});

const MARKER = L.marker([0, 0], { icon: issIcon }).addTo(MY_MAP);

const ISS_URL = "https://api.wheretheiss.at/v1/satellites/25544";

/** Code below fetches the information
 * from the iss api and displays it
 * on the page
 */

let firstTime = true;
async function getISS() {
	const RESPONSE = await fetch(ISS_URL);
	const DATA = await RESPONSE.json();
	const { latitude, longitude, altitude, velocity } = DATA;
	const DECIMAL_AMOUNT = 3;
	const MAP_ZOOM = 2;

	MARKER.setLatLng([latitude, longitude]);
	if (firstTime) {
		MY_MAP.setView([latitude, longitude], MAP_ZOOM);
		firstTime = false;
	}

	document.getElementById("lat").textContent = latitude.toFixed(DECIMAL_AMOUNT);
	document.getElementById("long").textContent = longitude.toFixed(
		DECIMAL_AMOUNT
	);
	document.getElementById("alt").textContent = altitude.toFixed(DECIMAL_AMOUNT);
	document.getElementById("vel").textContent = velocity.toFixed(DECIMAL_AMOUNT);
}

/**
 * Code below is copied from Magnific Popup
 * https://dimsemenov.com/plugins/magnific-popup/
 * and it provides a "Lightbox Gallery" effect
 * to gallery-section
 *
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
 *
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
//getISS();
//setInterval(getISS, 1000);
