$(document).ready(function () {

  

  // Start Location R-T section

  // making a map and tiles
  const mymap = L.map('iss-map').setView([0, 0], 1);
    const attribution = 
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
  const tiles = L.tileLayer(tileUrl,{ attribution });
  tiles.addTo(mymap);

  // making a marker with a costume icon
  var issIcon = L.icon({
    iconUrl: 'SpaceStation/img/iss-map-icon.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

  const marker = L.marker([0, 0], {icon: issIcon} ).addTo(mymap);


  const iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
  
  let firstTime = true;
  async function getISS() {
      const response = await fetch(iss_url);
      const data = await response.json();
      const { latitude, longitude, altitude, velocity } = data;

      marker.setLatLng([latitude, longitude]);
      if (firstTime) {
      mymap.setView([latitude, longitude], 2);
      firstTime = false;
      }

      document.getElementById("lat").textContent = latitude.toFixed(3);
      document.getElementById("long").textContent = longitude.toFixed(3);
      document.getElementById("alt").textContent = altitude.toFixed(3);
      document.getElementById("vel").textContent = velocity.toFixed(3);
    }
   
  getISS();

  setInterval(getISS, 1000)
   
  // End Location R-T section

  
    //code below copied from Magnific Popup

    $(".gallery-section .grid .test-popup-link").magnificPopup({
    type: "image",
    gallery:{enabled:true}
  });

  //code below copied from Owl carousel
  $(".page-main .quotes-section .owl-carousel").owlCarousel({
      loop: true,
      autoplay: true,
      dots: true,
      responsive:{
          0: {
              items:1
          },
          544:{
              items:2
          }
      }
  })
});


