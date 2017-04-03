;(function(window) {
    "use strict";

    var $ = window.jQuery;

    $('.js-first-map').on('click', function(e) {
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address=K%C4%81r%C4%BCa%20Ulma%C5%86a%20gatve%20123,%20R%C4%ABga,%20LV-1046&key=AIzaSyAuXaxjCgq9PsUFUSYAvmj8JirgMF_qFiM", function(data) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng},
          zoom: 16,
          disableDefaultUI: false,
          scrollwheel: false
        });

        var image = '/media/img/marker.png';
        var beachMarker = new google.maps.Marker({
          position: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng},
          map: map,
          icon: image
        });
      });
    });

    $('.js-second-map').on('click', function(e) {
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address=Va%C4%BC%C5%86u%20iela%2030,%20Daugavpils,%20LV-5401&key=AIzaSyAuXaxjCgq9PsUFUSYAvmj8JirgMF_qFiM", function(data) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng},
          zoom: 16,
          disableDefaultUI: false,
          scrollwheel: false
        });

        var image = '/media/img/marker.png';
        var beachMarker = new google.maps.Marker({
          position: {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng},
          map: map,
          icon: image
        });
      });
    });

    window.Map = function() {
      if($('.content__inner-contacts').length > 0) {
        console.log('Map initialized');
        var map;


      }
    };
}(window));
