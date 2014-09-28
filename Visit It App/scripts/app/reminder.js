window.Reminder = (function () {
    function Reminder(text, location, datetime, mode) {
        this.text = text;
		this.location = location;
		this.datetime = datetime;
		this.mode = mode;
    }
    
    return Reminder;
}());
