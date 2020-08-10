$(document).ready(function () {

  const mymap = L.map('iss-map').setView([0, 0], 1);

  const attribution = 
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';    
  const tiles = L.tileLayer(tileUrl,{ attribution });
  tiles.addTo(mymap);

  const iss_url = "https://api.wheretheiss.at/v1/satellites/25544"  
  async function getISS() {
      const response = await fetch(iss_url);
      const data = await response.json();
      const { latitude, longitude, altitude, velocity } = data;

      document.getElementById("lat").textContent = latitude;
      document.getElementById("long").textContent = longitude;
      document.getElementById("alt").textContent = altitude;
      document.getElementById("vel").textContent = velocity;
    }
   
  getISS();

  
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


