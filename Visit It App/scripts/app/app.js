(function () {
    document.addEventListener('deviceready', function () {
		window.everlive = new Everlive('QvPBa4veV2mtuzwB');
        window.kendoApp = new kendo.mobile.Application(document.body);  
		
		window.addEventListener('offline', onOffline, false);
		window.addEventListener('online', onOnline, false);
    });
	
	function onOffline() {
		navigator.notification.alert('You do not have internet connection. Using this app will not be complete.');
	}
	
	function onOnline() {
		navigator.notification.alert('You have regained internet connection.');
	}
}());