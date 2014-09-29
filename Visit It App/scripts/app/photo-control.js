var app = app || {};

(function (scope) {
	function onSuccess(data) {
		
	}
	
	function onError(error) {
		
	}
	
	function takeRandomPhoto() {
		navigator.device.capture.captureImage(onSuccess, onError);
	}
	
	scope.photoControl = {
		takeRandomPhoto: takeRandomPhoto
	}
}(app));