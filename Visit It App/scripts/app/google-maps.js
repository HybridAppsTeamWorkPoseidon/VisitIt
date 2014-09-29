var app = app || {};

(function (scope) {
	var marker;
	var isPropertiesViewOpened;
	var longitudeMarker;
	var latitudeMarker;
	var allowConnection;
	var currentLocationMarker;

	function configureWatchingLocation() {
		navigator.geolocation.watchPosition(function (position) {
			currentLocationMarker.setPosition(
				new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
		});
		
		var compassOptions = {
			frequency: 3000
		};

		navigator.compass.watchHeading(function (heading) {
			
		}, function (error) {
			navigator.notification.alert('Compass error: ' + compassError.code);
		}, compassOptions);
	}

	function onSuccess(position) {
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;
		var latLong = new google.maps.LatLng(latitude, longitude);

		var mapOptions = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var $mapContainer = $('#map');
		var parentWidth = $mapContainer.parent().css('width');
		var parentHeight = $mapContainer.parent().parent().css('height');
		var titleHeight = $('.km-view-title').css('height');

		$mapContainer.css('width', (parseInt(parentWidth)) + 'px');
		$mapContainer.css('height', (parseInt(parentHeight) - parseInt(titleHeight) - 2) + 'px');

		window.map = new google.maps.Map($mapContainer.get(0),
			mapOptions);

		everlive.data('Reminders')
			.get()
			.then(function (data) {
				var reminders = data.result;
				var len = reminders.length;

				for (var i = 0; i < len; i++) {
					var current = reminders[i];
					var latLongCurrent = new google.maps.LatLng(current.Location.latitude, current.Location.longitude);
					placeMarker(latLongCurrent, current.Mode.Icon);
				}
			}, function (error) {
				navigator.notification.alert('Could not retrieve reminders.');
			});

		everlive.Files.getById('61bebbd0-47da-11e4-8f65-cd6ac76b676a')
			.then(function (data) {
				currentLocationMarker = new google.maps.Marker({
					position: latLong,
					map: window.map,
					icon: data.result.Uri
				});
			}, function (error) {
				navigator.notification.alert('Could not retrieve icon.');
			});
		
		google.maps.event.addListener(window.map, 'click', function (event) {
			createNewMarker(event.latLng);
		});
		
		configureWatchingLocation();
		
	}

	function onError(error) {
		navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message);
	}

	function createNewMarker(location) {
		longitudeMarker = location.lng();
		latitudeMarker = location.lat();

		var notificationMessage = 'Do you want to add new location at this spot?';
		var notificationTitle = 'Add location';
		var notificationButtons = ['Yes', 'No'];
		navigator.notification.confirm(
			notificationMessage, // message
			onMarkerConfirm, // callback to invoke with index of button pressed
			notificationTitle, // title
			notificationButtons // buttonLabels
		);
	}

	function checkConnection() {
		var networkState = navigator.network.connection.type;
		if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
			allowConnection = false;
			var noConnectionMessage = 'You have no internet connection';
			var noConnectionTitle = 'No connectivity!';
			var noConnectionButton = 'Dismiss';
			navigator.notification.alert(
				noConnectionMessage,
				null,
				noConnectionTitle,
				noConnectionButton
			);

		} else if (networkState == Connection.CELL_2G || networkState == Connection.CELL_3G || networkState == Connection.CELL_4G) {
			var mobilePlanMessage = "You are using your mobile data plan. Do you want to proceed accessing google maps?";
			var mobilePlanTitle = "Internet connection";
			var mobilePlanButtons = ['Yes', 'No'];
			navigator.notification.confirm(
				mobilePlanMessage,
				onMobilePlanUsage,
				mobilePlanTitle,
				mobilePlanButtons
			);
		} else if (networkState == Connection.WIFI) {
			allowConnection = true;
		}
	}

	function onMobilePlanUsage(buttonIndex) {
		if (buttonIndex == 1) {
			allowConnection = true;
		} else if (buttonIndex == 2) {
			allowConnection = false;
		}
	}

	function onMarkerConfirm(buttonIndex) {
		if (buttonIndex == 1) {
			isPropertiesViewOpened = true;
			$("#location-properties-modalview").data("kendoMobileModalView").open();

			$("#longitude").text(longitudeMarker);
			$("#latitude").text(latitudeMarker);
		} else if (buttonIndex == 2) {
			cancelMarkerAddition();
		}
	}

	function showCurrentLocation() {
		navigator.geolocation.getCurrentPosition(function (position) {
			kendoApp.navigate('views/map-view.html');
			var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			window.map.panTo(currentPosition);
		});
	}
	
	function placeMarker(location, picId) {
		if (location == null) {
			location = new google.maps.LatLng(latitudeMarker, longitudeMarker);
		}

		everlive.Files.getById(picId)
			.then(function (data) {
				marker = new google.maps.Marker({
					position: location,
					map: window.map,
					icon: data.result.Uri
				});
			}, function (error) {
				navigator.notification.alert('Could not retrieve icon.');
			});
	}
	
	function cancelMarkerAddition() {
		marker.setMap(null);

		if (isPropertiesViewOpened) {
			$("#location-properties-modalview").kendoMobileModalView("close");
		}
	}
	function initialize() {
		checkConnection();
		if (allowConnection) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		}
	}

	function openReminderLocation(e) {
		kendoApp.navigate('views/map-view.html');
		var id = $(e.target).data('id');

		everlive.data('Reminders')
			.getById(id)
			.then(function (data) {
				var latLong = new google.maps.LatLng(data.result.Location.latitude, data.result.Location.longitude);

				var mapOptions = {
					center: latLong,
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				window.map.setOptions(mapOptions);
			}, function (error) {
				navigator.notification.vibrate();
				navigator.notification.alert('Could not find reminder.');
			});
	}
	
	scope.googleMaps = kendo.observable({
		placeMarker: placeMarker,
		initialize: initialize,
		cancelMarkerAddition: cancelMarkerAddition,
		openReminderLocation: openReminderLocation,
		showCurrentLocation: showCurrentLocation
	});
}(app));