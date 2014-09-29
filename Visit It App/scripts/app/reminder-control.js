var app = app || {};

(function (scope) {
	var $itemToDelete;

	function onDeletionConfirm(buttonIndex) {
		if (buttonIndex == 1) {
			var id = $itemToDelete.find('button').first().data('id');

			everlive.data('Reminders')
			.destroySingle({
					Id: id
				},
				function () {
					var parentId = $itemToDelete.parent()[0].id;
					
					if (parentId.indexOf('home', parentId.length - 4) !== -1) {
						app.viewmodels.home.initialize();
					}
					else if (parentId.indexOf('reminder', parentId.length - 8) !== -1) {
						app.viewmodels.reminder.initialize();
					}
					else if (parentId.indexOf('spy', parentId.length - 3) !== -1) {
						app.viewmodels.spy.initialize();
					}
				},
				function (error) {
					navigator.notification.alert('Could not remove reminder.');
				});
		}
	}

	function notifyForNearByReminders() {

	}

	function deletePrompt(e) {
		console.log('swipe');
		$itemToDelete = $(e.sender.element[0]);

		var notificationMessage = 'Are you sure you want to delete this reminder?';
		var notificationTitle = 'Delete';
		var notificationButtons = ['Yes', 'No'];
		navigator.notification.confirm(
			notificationMessage, // message
			onDeletionConfirm, // callback to invoke with index of button pressed
			notificationTitle, // title
			notificationButtons // buttonLabels
		);
	}
	
	function addSwipeEventToList(){
		$(".reminders-list li").kendoTouch({
			enableSwipe: true,	
			swipe: function (e) {
				deletePrompt(e);
			}
		});
	}
	app.reminderControl = {
		deletePrompt: deletePrompt,
		addSwipeEventToList: addSwipeEventToList
	}
}(app));