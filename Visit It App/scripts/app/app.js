(function () {
    document.addEventListener("deviceready", function () {
        var kendoApp = new kendo.mobile.Application(document.body);
        $("#map a").on( "click", function() {
            navigator.geolocation.getCurrentPosition(onSuccess);
        });
        
    });
    
    // Initialize tasks storage place if started for the first time
    if (window.localStorage.getItem('events') == undefined) {
        window.localStorage.setItem('events', JSON.stringify([]));
    }
    
    // testing
    var location = new Location(10, 15);
    console.log(location.longitude);
}());