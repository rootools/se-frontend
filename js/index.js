window._se = {
  map: {
    scrollwheel: false,
    draggable: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true
  }
};

var windowHeight = function(){
    return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
}
var windowWidth = function(){
    return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
}

var CurrentPlace = function(position) {
  var latlng, map, marker, myOptions;

  _se.mapcanvas = document.getElementById('mapcanvas');
  _se.mapcanvas.style.height = windowHeight() - 40 + 'px';
  _se.mapcanvas.style.width = windowWidth() + 'px';
  map = document.getElementById('map');
  map.appendChild(_se.mapcanvas);

  latlng = new google.maps.LatLng(41.72809214560253, -74.99112284183502);//position.coords.latitude, position.coords.longitude);
  myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  myOptions = $.extend(myOptions, _se.map);

  _se.map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);

  return marker = new google.maps.Marker({
    position: latlng,
    visible: false,
    map: _se.map,
    title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
  });
};

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(CurrentPlace);
}

$(window).on('resize', function() {
  if (typeof _se.mapcanvas !== "undefined") {
    _se.mapcanvas.style.height = windowHeight() - 40 + 'px';
    _se.mapcanvas.style.width = windowWidth() + 'px';
  }
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

var DrawHeatMap = function(data) {

  var heatmapDataAr = {};
  $.each(data, function(i, heat) {
    if (!heatmapDataAr[heat.color]) {
      heatmapDataAr[heat.color] = [];
    }
    
    heatmapDataAr[heat.color].push({location: new google.maps.LatLng(heat.lat, heat.lng), weight: heat.weight});
  });

  $.each(heatmapDataAr, function(color, heatmapData) {

    rgb = hexToRgb(color);

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      opacity: 0.8,
      gradient: [
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 0)',
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 1)'
      ]
    });

    heatmap.setMap(_se.map);
  });

}

var hash = window.location.hash.split('=');

if ($.cookie('auth') || (hash && hash[0] == '#access_token')) {
  Users._access_token = hash[1];
  Users.check();
}
