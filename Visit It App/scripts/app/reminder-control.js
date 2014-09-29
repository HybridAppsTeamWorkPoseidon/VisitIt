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
				function () {},
				function (error) {
					navigator.notificatin.alert('Could not remove reminder.');
				});
		}
	}

	function notifyForNearByReminders() {

	}

	function deletePrompt(e) {
		console.log('swipe');
		$itemToDelete = $(e.target);

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
	
	app.reminderControl = {
		deletePrompt: deletePrompt
	}
}(app));