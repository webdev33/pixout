var map;
var icon;
var linedata;
var line;

function local() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap, erreur, {enableHighAccuracy: true});
    } else {
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
    }
}

function erreur(error) {
    switch (error.code) {
    case error.UNKNOWN_ERROR:
        alert("La geolocation a rencontré une erreur.");
        break;
    case error.PERMISSION_DENIED:
        alert("Vous n'avez pas autorisé l'accès à votre position.");
        break;
    case error.POSITION_UNAVAILABLE:
        alert("Vous n'avez pas pu être localisé.");
        break;
    case error.TIMEOUT:
        alert("La geolocation prend trop de temps.");
        break;
    }
}

function initMap(position) {
    map = L.map('map', {
        center: [position.coords.latitude, position.coords.longitude],
        zoom: 16
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar' }).addTo(map);

    icon = L.icon({ iconUrl: "css/images/map-512.png", iconeSize: [1, 1] });
    linedata = Array();
    line = L.polyline(linedata, { color: 'red' }).addTo(map);
    L.marker([position.coords.latitude, position.coords.longitude], { icon: icon }).bindPopup(photo, {}).addTo(map);

    map.addEventListener("click", addPoint);


    /*L.Routing.control({
        router: L.Routing.osrm({ serviceUrl:"http://router.project-osrm.org/viaroute"} ),
        waypoints: [
          L.latLng(48.40, 2.3),
          L.latLng(48.90, 2.6)
        ]
    }).addTo(map);*/
}

function addPoint(e) {
    L.marker(e.latlng, { icon: icon }).bindPopup(photo, {}).addTo(map);
    linedata.push(e.latlng);
    line.addLatLng(e.latlng);
}

