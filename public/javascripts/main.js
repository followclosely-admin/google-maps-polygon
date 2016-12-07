(function(){

var ramda = require('ramda')
var map

// will be generated by database
var homes = [
  { lat: 39.71933533081653, lng: -104.95479583740234 },
  { lat: 39.74943369178247, lng: -105.02723693847656 },
  { lat: 39.771339142289, lng: -104.97539520263672 },
  { lat: 39.78637860850151, lng: -104.99771118164062 },
  { lat: 39.78980820192016, lng: -104.908447265625 },
  { lat: 39.43407169253772, lng: -104.09271240234375 }
]

function initMap() {
  var opts = require('./opts')
  var undoPin = require('./undoPin')
  var logPath = require('./logPath')

  var mapDiv = 'map-canvas'
  var mapOpts = opts.mapOpts

  map = new google.maps.Map(document.getElementById(mapDiv), mapOpts)

  var points = new google.maps.MVCArray()
  var polyOpts = opts.polyOpts
  var polygon = new google.maps.Polygon(polyOpts)
  polygon.setMap(map)

  var currentPath = polygon.getPath()
  google.maps.event.addListener(map, 'click', function(e) {
    if(currentPath.length < 6) currentPath.push(e.latLng)
  })

  undoPin()
  logPath(currentPath)

  var checkAgainstMap = function(location, polygon){
    var polygon = polygon
    if(google.maps.geometry.poly.containsLocation(location, polygon)) {
      console.log(true)
    } else { console.log(false) }
  }

  var checkAgainstMapBtn = document.getElementById('check-against-map')
  checkAgainstMapBtn.addEventListener('click', function(e){
    var home0 = new google.maps.LatLng(homes[1])
    e.preventDefault()
    checkAgainstMap(home0, polygon)
  })

}

window.onload = initMap

}())