(function () {
    document.addEventListener("deviceready", function () {
		window.everlive = new Everlive('QvPBa4veV2mtuzwB');
        window.kendoApp = new kendo.mobile.Application(document.body);   
    });
    
    // Initialize tasks storage place if started for the first time
    if (window.localStorage.getItem('events') == undefined) {
        window.localStorage.setItem('events', JSON.stringify([]));
    }
}());