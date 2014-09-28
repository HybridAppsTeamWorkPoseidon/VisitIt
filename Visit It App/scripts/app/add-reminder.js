var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	scope.addReminder = {
		text: '',
		location: new Location(0, 0),
		datetime: new Date(),
		mode: '',
		modes: ['reminder', 'challenger', 'spy'],
		saveReminder: function () {
			var newReminder = new Reminder(this.text, this.location, this.datetime, this.mode);
			console.log(newReminder);
			$("#location-properties-modalview").kendoMobileModalView("close");
		}
	};
}(app.viewmodels));