window.Location = (function () {
    function Location(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
    
    return Location;
}());