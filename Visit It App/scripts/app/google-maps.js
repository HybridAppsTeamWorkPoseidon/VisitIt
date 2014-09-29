var app = app || {};

(function (scope) {
    var map;
	var marker;
	var isPropertiesViewOpened;
	var longitudeMarker;
    var latitudeMarker;    
    
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
        
        map = new google.maps.Map($mapContainer.get(0),
            mapOptions);
		
        for (var i = 0; i < localStorage.length; i++){
            var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(item.hasOwnProperty("text") && item.text != "" && item.datetime !=null){
                var latLongCurrent = new google.maps.LatLng(item.location.latitude,item.location.longitude);
                placeMarker(latLongCurrent, item.mode);
            }
        }
        
		google.maps.event.addListener(map, 'click', function(event) {
        	createNewMarker(event.latLng);
    	});
	}
	
	function onError(error) {
		navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message);
	}
	
	function createNewMarker(location) {
        longitudeMarker = location.lng();
        latitudeMarker = location.lat();    
		
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
        
   function placeMarker(location, mode) {
        if(location == null){
           location = new google.maps.LatLng(latitudeMarker,longitudeMarker);
        }
        var icon = "";
        switch(mode){
            case "Challenger": icon="Images/challenge32x32.png"; break;
            case "Reminder": icon="Images/reminder32x32.png"; break;
            case "Spy": icon="Images/spy32x32.png"; break;
        }
		marker = new google.maps.Marker({
		  position: location,
		  map: map,
          icon: icon
		});
	}
	
	function onMarkerConfirm(buttonIndex) {
		if ( buttonIndex == 1) {
			isPropertiesViewOpened = true;
			$("#location-properties-modalview").data("kendoMobileModalView").open();
            
            $("#longitude").text(longitudeMarker);
            $("#latitude").text(latitudeMarker);
		} 
		else if (buttonIndex == 2) {
			cancelMarkerAddition();
		}
	}
	
	function cancelMarkerAddition() {
		marker.setMap(null);
		
		if (isPropertiesViewOpened) {
			$("#location-properties-modalview").kendoMobileModalView("close");
		}
	}
	
    scope.googleMaps = {
        placeMarker: placeMarker,
        initialize: initialize,
		cancelMarkerAddition: cancelMarkerAddition
    };
}(app));