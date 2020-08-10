$(document).ready(function () {
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


