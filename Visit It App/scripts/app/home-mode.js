var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
    function initialize() {
		everlive.data('Reminders')
			.get()
			.then(function (data) {				
				mobileListViewDataBindInit(data.result);
			}, function (error) {
				navigator.notification.alert('Could not retrieve reminders.');
			});
    }
	
	function mobileListViewDataBindInit(data) {
		$("#grouped-listview").kendoMobileListView({
			dataSource: data,
			template: $('#reminderViewTemplate').html(),
			fixedHeaders: true
		});
	}
    	
    scope.home = {
        initialize: initialize
    };
}(app.viewmodels));