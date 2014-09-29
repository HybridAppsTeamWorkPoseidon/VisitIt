var app = app || {};

(function (scope) {
	function onSuccess(data) {
		navigator.notification.vibrate();
		navigator.notification.alert('Picture taken successfully.');
	}
	
	function onError(error) {
		navigator.notification.alert('Could not take picture.');
	}
	
	function takeRandomPhoto() {
		navigator.device.capture.captureImage(onSuccess, onError);
	}
	
	scope.photoControl = {
		takeRandomPhoto: takeRandomPhoto
	}
}(app));