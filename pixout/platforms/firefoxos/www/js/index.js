var beginning, end;

function onLoad() {
    POMap.init();
    POMap.addPoint("point 1", [48.40, 2.3], "photo.png");
    POMap.addPoint("point 2", [48.44, 2.5], "photo.png");
    POMap.addPoint("point 3", [48.34, 2.4], "photo.png");
    POMap.addPoint("point 4", [48.384, 2.43], "photo.png");
    POMap.addPoint("point 5", [48.30, 2.4], "photo.png");
    POMap.addPoint("point 6", [48.20, 2.3], "photo.png");

    POMap.addEventHandler("click", selectBeginning);
}

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