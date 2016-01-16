
var myCenter = new google.maps.LatLng(33.6038895,-111.7262195);

function initialize() {
  var mapProp = {
    center: myCenter,
    zoom:13,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


  var marker=new google.maps.Marker({
	position:myCenter,
	});
	marker.setMap(map);

}
google.maps.event.addDomListener(window, 'load', initialize);




function RestaurantProfile(name) {
	var self = this;
	self.name = name;
}


function appViewModel() {
	var self = this;

	self.localRestaurant = ko.observableArray([
		{ restaurantName: "Senior Taco"},
		{ restaurantName: "Katana Sushi"},
		{ restaurantName: "El Canto"},
		{ restaurantName: "Sapori D'Italia"},
		{ restaurantName: "Parkview Tap House"}
	]);

};

ko.applyBindings(new appViewModel());




//location: google.maps.LatLng(33.6087496,-111.7300162)