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
        
        $mapContainer.css('width', (parseInt(parentWidth)) + 'px');
        $mapContainer.css('height', (parseInt(parentHeight)) + 'px');
        
        var map = new google.maps.Map($mapContainer.get(0),
            mapOptions);
		
		google.maps.event.addListener(map, 'click', function(event) {
        	placeMarker(event.latLng, map);
    	});
	}
	
	function onError(error) {
		navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message);
	}
	
	function placeMarker(location, map) {
		var marker = new google.maps.Marker({
		  position: location,
		  map: map,
		  openInfoWindowHtml: "here i am"
		});
		
		var notificationMessage = 'Do you want to add new location at this spot?';
		var notificationTitle = 'Add location';
		var notificationButtons = ['Yes', 'No'];
		navigator.notification.confirm(
				notificationMessage,  // message
				onMarkerConfirm,              // callback to invoke with index of button pressed
				notificationTitle,            // title
				notificationButtons          // buttonLabels
		);
	}
	
	function onMarkerConfirm(buttonIndex) {
			switch(buttonIndex){
				case 1: kendoApp.navigate('views/location-properties-view.html');
					break;
				case 2: marker.setMap(null);
					break;        
			}
		}
	
    scope.googleMaps = {
        initialize: initialize
    };
}(app.viewmodels));