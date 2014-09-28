var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function initialize() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
	function onSuccess(position) {
		var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude)
    
        var mapOptions = {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        
        var $mapContainer = $('#map');
        var parentWidth = $mapContainer.parent().css('width');
        var parentHeight = $mapContainer.parent().parent().css('height');
        
        $mapContainer.css('width', (parseInt(parentWidth) * 3) + 'px');
        $mapContainer.css('height', (parseInt(parentHeight) * 3) + 'px');
        
        var map = new google.maps.Map($mapContainer.get(0),
            mapOptions);
	}
	
	function onError(error) {
		navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message);
	}
	
    scope.googleMaps = {
        initialize: initialize
    };
}(app.viewmodels));