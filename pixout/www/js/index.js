document.addEventListener("deviceready", onDeviceReady, false);
var image;
var position;
var storage;

function onDeviceReady() {
    //console.log("ready");
//    POMap.init([48.3, 2.4]);
//    POMap.addPoint("test", [48.31, 2.42], "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE..........ASABIAAD/2wAGADABg D//Z");
		if(typeof(window.localStorage) != 'undefined'){
			storage = window.localStorage.getItem("photos");
      if(typeof(storage) == 'undefined'){
			  window.localStorage.setItem("photos", []);
      }
      else {
        image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
    		throw "photos already defined";
      }
		}
		else{
			throw "window.localStorage, not defined";
		}
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
    navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

var onSuccessLocation = function(position) {
  position = [position.coords.latitude, position.coords.longitude];
  alert('latitude: ' + position[0] + ' et longitude: ' + position[1]);
  storage.push([position, image]);
  window.localStorage.setItem("photos",storage);
  console.log(storage[0][1]);
};

function onErrorLocation(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
