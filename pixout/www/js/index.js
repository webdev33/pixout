document.addEventListener("deviceready", onDeviceReady, false);

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
    saveToPhotoAlbum: true
  });
}

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
