var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function initialize() {
		var filter = new Everlive.Query();
		filter.where().eq('Mode.Name', 'Challenger');
		
		everlive.data('Reminders')
			.get(filter)
			.then(function (data) {				
				mobileListViewDataBindInit(data.result);
			}, function (error) {
				navigator.notification.alert('Could not retrieve reminders.');
			});
    }
	
	function mobileListViewDataBindInit(data) {
		$("#listview-challenge").kendoMobileListView({
			dataSource: data,
			template: $('#reminderViewTemplate').html(),
			fixedHeaders: true
		});
	}
    	
    scope.challenge = {
        initialize: initialize
    };
}(app.viewmodels));