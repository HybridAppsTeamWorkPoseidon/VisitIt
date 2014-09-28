window.Location = (function () {
    function Location(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
    
    return Location;
}());

function onSuccess(position){
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);
    
    var mapOptions = {
        center: latLong,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);
    
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng, map);
    });
}

function placeMarker(location, map) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      openInfoWindowHtml: "here i am"
    });
    
    var notificationMessage = 'Do you want to add new location at this spot?';
    var notificationTitle = 'Add location';
    var notificationButtons = 'Yes,No';
    navigator.notification.confirm(
            notificationMessage,  // message
            onConfirm,              // callback to invoke with index of button pressed
            notificationTitle,            // title
            notificationButtons          // buttonLabels
    );
    
    function onConfirm(buttonIndex) {
        switch(buttonIndex){
            case 1: $("#properties").click(); break;
            case 2: marker.setMap(null);
                break;        
        }
    }
}
