(function () {
    document.addEventListener("deviceready", function () {
        window.kendoApp = new kendo.mobile.Application(document.body);   
    });
    
    // Initialize tasks storage place if started for the first time
    if (window.localStorage.getItem('events') == undefined) {
        window.localStorage.setItem('events', JSON.stringify([]));
    }
    
    // testing
    var location = new Location(10, 15);
    console.log(location.longitude);
}());