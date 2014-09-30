var app = app || {};
app.viewmodels = app.viewmodels || {};

(function (scope) {
	var listview;
	
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
		if (listview !== undefined) {
			listview.destroy();	
		}
		
		listview = $("#listview-home").kendoMobileListView({
			dataSource: data,
			template: $('#reminderViewTemplate').html(),
			fixedHeaders: true
		});
		
		app.reminderControl.addSwipeEventToList();
	}
    	
    scope.home = {
        initialize: initialize
    };
}(app.viewmodels));