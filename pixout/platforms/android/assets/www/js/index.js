document.addEventListener("deviceready", onDeviceReady, false);
var image;
var position;
var storage;
var waypoints = [];
var watchID;
var whatPage;

if(typeof(window.localStorage) != 'undefined'){
  storage = JSON.parse(window.localStorage.getItem("photos"));
  if(!storage){
    storage = [];
  }
}
else{
  storage = [];
}

function onDeviceReady() {
    //console.log("ready");

    whatPage = 1;
    var icon = document.getElementById("bouton-left");
    var circle = document.getElementById("circle-go");
    circle.onclick = changePageGo;
    icon.onclick = actionLeft;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(localized, locerreur, {enableHighAccuracy: true});
    } else {
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
        POMap.init([48.3, 2.4]);
    }

    function changePageGo() {
        circle.id = "circle-camera";
        document.getElementById("text-button").innerHTML = "STOP";
        document.getElementById("icon-profil").id = "icon-stop";
        whatPage = 2;
        camera = document.getElementById("circle-camera");
        circle.removeAttribute("onclick");
        camera.onclick = takePicture;
        gotrip();
    }

    function actionLeft() {
        if (whatPage == 2) {
            document.getElementById('icon-stop').id = "icon-cancel";
            document.getElementById("text-button").innerHTML = "ANNULER";
            document.getElementById("hidden").id = "visible";
            circle.removeAttribute("onclick");
            circle.id = "circle-upload";
            whatPage = 3;
            stopTrip();
        }
        else if (whatPage == 3) {
            document.getElementById("visible").id = "hidden";
            document.getElementById("icon-cancel").id = "icon-profil";
            document.getElementById("text-button").innerHTML = "PROFIL";
            circle.id = "circle-go";
            whatPage = 1;
            circle.onclick = changePageGo;
        }
    }
}


function localized(position) {
  POMap.init([position.coords.latitude, position.coords.longitude]);
}

function locerreur(error) {
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
    POMap.init([48.3, 2.4]);
}

function takePicture() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality : 75,
    destinationType : Camera.DestinationType.DATA_URL,
    sourceType : Camera.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: true,
  });
}

function onSuccess(imageData) {
    image = "data:image/jpeg;base64," + imageData;
    console.log(storage);
    navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

var onSuccessLocation = function(position) {
  position = [position.coords.latitude, position.coords.longitude];
  console.log('latitude: ' + position[0] + ' et longitude: ' + position[1]);
  if (!storage) {
    storage = [];
    console.log("coin");
  }
  storage.push([position, image]);
  window.localStorage.setItem("photos",JSON.stringify(storage));
  POMap.addPoint("Marqueur", position, image);
};

function onErrorLocation(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function gotrip() {
    function onSuccess(position) {
        var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            waypoints.push([position.coords.latitude, position.coords.longitude]);
            if (waypoints.length % 10 == 0) {
                POMap.setTrip(waypoints);
            };
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        console.log("une erreur est survenue");
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000 });

}
function stopTrip(){
  navigator.geolocation.clearWatch(watchID);
}
