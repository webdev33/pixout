document.addEventListener("deviceready", onDeviceReady, false);
var image;
var position;
var storage;


if(typeof(window.localStorage) != 'undefined'){
  storage = JSON.parse(window.localStorage.getItem("photos"));
  if(!storage){
    storage = [];
  }
}
else{
  storage = [];
}

function onLoad() {
    local();
}

function onDeviceReady() {
    //console.log("ready");
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
    image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
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
};

function onErrorLocation(error) {
    console.log('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
