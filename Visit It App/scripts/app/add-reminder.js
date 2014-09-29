var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	var storage = window.localStorage;
	var location = {};
	
	scope.addReminder = kendo.observable({
		text: '',
		location: null,
		remindDate: new Date(),
		mode: 'Reminder',
		modes: ['Reminder', 'Challenger', 'Spy'],
		saveReminder: function () {
			var longitude = parseFloat($("#longitude").text());
			var latitude = parseFloat($("#latitude").text());
			
			var location = {
				longitude: longitude,
				latitude: latitude
			};
			
			var text = this.text;
			var mode = this.mode;
			var remindDate = this.remindDate;

			var filter = new Everlive.Query();
			filter.where().eq('Name', mode);
			var modes = everlive.data('Modes');
			modes.get(filter)
				.then(
					function (data) {
						mode = data.result[0];
						
						everlive.Files.getById(mode.Icon)
						.then(function (data) {
							var reminders = everlive.data('Reminders');
							reminders.create({
								'Title': text,
								'Location': location,
								'Mode': mode,
								'ModePicUri': data.result.Uri,
								'RemindDate': remindDate
							});
							app.googleMaps.placeMarker(null, mode.Icon);
							$("#location-properties-modalview").kendoMobileModalView("close");
						});
					},
					function (error) {
						$("#location-properties-modalview").kendoMobileModalView("close");
						navigator.notification.alert('Reminder could not be added.');
					});
		}
	});
}(app.viewmodels));