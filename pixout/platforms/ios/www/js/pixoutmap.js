var map;
var icon;
var linedata;
var line;

function initMap() {
    map = L.map('map', {
        center: [48.85, 2.45],
        zoom: 13
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar' }).addTo(map);

    icon = L.icon({ iconUrl: "icone.png", iconeSize: [24, 24] });
    linedata = Array();
    line = L.polyline(linedata, { color: 'red' }).addTo(map);

    map.addEventListener("click", addPoint);


    L.Routing.control({
        router: L.Routing.osrm({ serviceUrl:"http://router.project-osrm.org/viaroute"} ),
        waypoints: [
          L.latLng(48.40, 2.3),
          L.latLng(48.90, 2.6)
        ]
    }).addTo(map);
}

function addPoint(e) {
    L.marker(e.latlng, { icon: icon }).bindPopup(photo, {}).addTo(map);
    linedata.push(e.latlng);
    line.addLatLng(e.latlng);
}

