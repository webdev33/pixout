var POMap = {
    map: null,
    places: [],
    icon: null,

    init: function() {
        this.map = L.map('map', {
            center: [48.39, 2.45],
            zoom: 12
        });

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(this.map);

        this.icon = L.icon({ iconUrl: "img/icone.png", iconeSize: [24, 24] });
    },

    addPoint: function (name, latlng, url) {
        this.places.push(new POPlace(name, latlng, url));
        L.marker(latlng, { icon: this.icon }).addTo(this.map);
    },

    addEventHandler: function(event, handler) {
        this.map.addEventListener(event, handler);
    },
    removeEventHandler: function(event, handler) {
        this.map.removeEventListener(event, handler);
    },

    addTrip: function (beginning, end) {
        var waypoints = [beginning];
        var p;
        var lat, lng;
        for (var i = 0; i < this.places.length; i++) {
            lat = this.places[i].latlng[0];
            lng = this.places[i].latlng[1];
            if (((beginning.lat < lat && lat < end.lat) || (beginning.lat > lat && lat > end.lat)) && ((beginning.lng < lng && lng < end.lng) || (beginning.lng > lng && lng > end.lng)))
                waypoints.push(this.places[i].latlng);
        }
        waypoints.push(end);

        L.Routing.control({
            router: L.Routing.osrm({ serviceUrl: "http://router.project-osrm.org/viaroute" }),
            waypoints: waypoints
        }).addTo(this.map);
    }
};

/*
        linedata = Array();
        line = L.polyline(linedata, { color: 'red' }).addTo(this.map);

    L.marker(e.latlng, { icon: icon }).bindPopup(photo, {}).addTo(map);
    linedata.push(e.latlng);
    line.addLatLng(e.latlng);
*/

