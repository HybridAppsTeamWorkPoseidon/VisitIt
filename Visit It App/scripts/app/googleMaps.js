var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function initialize() {
        var mapOptions = {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8
        };
        
        var $mapContainer = $('#map');
        var parentWidth = $mapContainer.parent().css('width');
        var parentHeight = $mapContainer.parent().parent().css('height');
        
        $mapContainer.css('width', (parseInt(parentWidth) * 3) + 'px');
        $mapContainer.css('height', (parseInt(parentHeight) * 3) + 'px');
        
        var map = new google.maps.Map($mapContainer.get(0),
            mapOptions);
    }
    
    scope.googleMaps = {
        initialize: initialize
    };
}(app.viewmodels));