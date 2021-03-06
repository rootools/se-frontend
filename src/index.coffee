CurrentPlace = (position) ->
  mapcanvas = document.createElement('div')
  mapcanvas.id = 'mapcanvas'
  mapcanvas.style.height = $(document).height() - 40 +'px'
  mapcanvas.style.width = $(document).width()+'px'

  map = document.getElementById('map')
  map.appendChild(mapcanvas)
  
  latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  myOptions = {
    zoom: 15,
    center: latlng,
    mapTypeControl: false,
    zoomControl: false,
    panControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  
  map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions)
  
  marker = new google.maps.Marker({
      position: latlng, 
      map: map, 
      title:"You are here! (at least within a "+position.coords.accuracy+" meter radius)"
  })


if navigator.geolocation
  navigator.geolocation.getCurrentPosition(CurrentPlace)