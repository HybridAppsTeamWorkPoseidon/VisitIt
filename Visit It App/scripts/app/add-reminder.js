var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    var storage = window.localStorage;
	scope.addReminder = {
		text: '',
		location: new Location(0, 0),
		datetime: new Date(),
		mode: 'Reminder',
		modes: ['Reminder', 'Challenger', 'Spy'],
		saveReminder: function () {
            var longitude = $("#longitude").text();
            var latitude = $("#latitude").text();
            this.location = new Location(longitude, latitude);
            
			var newReminder = new Reminder(this.text, this.location, this.datetime, this.mode);	
            
            storage.setItem(this.text,JSON.stringify(newReminder));
            
            app.googleMaps.placeMarker(null, this.mode);
			$("#location-properties-modalview").kendoMobileModalView("close");
		}
	};
}(app.viewmodels));