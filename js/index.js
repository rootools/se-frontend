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

  latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
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

  if (typeof _se.heatmaps !== "undefined") {
    $.each(_se.heatmaps, function(color, heatmap) {
      if (typeof data[color] !== "undefined") {
        var heatmapData = [];

        $.each(data[color], function(i, point) {
          heatmapData.push({location: new google.maps.LatLng(point.lat, point.lng), weight: point.weight*100});
        });
//console.log(heatmap);
        _se.heatmaps[color].setData(heatmapData);
      } else {
        heatmap.setMap(null);
        delete(_se.heatmaps[color]);
      }
    });
  } else {
    _se.heatmaps = {};
  }

  $.each(data, function(color, points) {

    if (typeof _se.heatmaps[color] !== "undefined") {
      return;
    }

    var heatmapData = [];
    var weights = [];

    $.each(points, function(i, point) {
      heatmapData.push({location: new google.maps.LatLng(point.lat, point.lng), weight: point.weight*100});
      weights.push(point.weight);
    });

    rgb = hexToRgb(color);

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: Math.max.apply(null, weights)*3,
      opacity: 0.9,
      gradient: [
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 0)',
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 0.6)',
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 0.8)',
          'rgba('+rgb.r+', '+rgb.g+', '+rgb.b+', 1)'
      ]
    });

    _se.heatmaps[color] = heatmap;

    heatmap.setMap(_se.map);
  });

}

var hash = window.location.hash.split('=');

if ($.cookie('auth') || (hash && hash[0] == '#access_token')) {
  Users._access_token = hash[1];
  Users.check();
}
