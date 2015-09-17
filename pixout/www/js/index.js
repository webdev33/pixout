function onLoad() {
    local();
}

function local() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(localized, local_erreur, { enableHighAccuracy: true });
    } else {
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
        localized({ coords: {latitude:48.42, longitude:2.78}});
    }
}

function local_erreur(error) {
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
    localized({ coords: { latitude: 48.42, longitude: 2.78 } });
}

function localized(position) {
    POMap.init([position.coords.latitude, position.coords.longitude]);
    POMap.addPoint("point 1", [48.40, 2.3], "photo.png");
    POMap.addPoint("point 2", [48.44, 2.5], "photo.png");
    POMap.addPoint("point 3", [48.34, 2.4], "photo.png");
    POMap.addPoint("point 4", [48.384, 2.43], "photo.png");
    POMap.addPoint("point 5", [48.30, 2.4], "photo.png");
    POMap.addPoint("point 6", [48.20, 2.3], "photo.png");

    POMap.addEventHandler("click", selectBeginning);
}

var beginning, end;
function selectBeginning(e) {
    beginning = e.latlng;
    POMap.removeEventHandler("click", selectBeginning);
    POMap.addEventHandler("dblclick", selectEnd);
}

function selectEnd(e) {
    end = e.latlng;
    POMap.removeEventHandler("dblclick", selectEnd);
    POMap.addEventHandler("click", selectBeginning);
    POMap.addTrip(beginning, end);
}

