var request = {
		location: {lat:33.6038895, lng:-111.7262195},
		radius: 50,
		query: 'food'
},
	fourSqClientID = 'B3GBLGC2TFDYJCL4HLM44XYRQ5MG1HF1PFBZUWOL0JQNLBL3',
	fourSqClientSecret = 'ODHJOFM0ABVVHB5AHXHZGPMP3QWOAAWDN4D1RIOL3DEKUVEW'



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



var fourSquareUrl = "https://api.foursquare.com/v2/venues/search"+
  "?client_id="+ fourSqClientID +
  "&client_secret="+ fourSqClientSecret +
  "&v=20160115"+
  "&ll=40.7,-74"+
  "&query=sushi";


	$.getJSON( "fourSquareUrl", function( data ) {
  		$.each(data.response.venues, function (i, venues) {
        	content = '<p>Name: ' + venues.name +
            ' Address: ' + venues.location.address +
            ' Lat/long: ' + venues.location.lat + ', ' + venues.location.lng + '</p>';
    	$(content).appendTo("#venues");
    });

});




/*
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
*/




//location: google.maps.LatLng(33.6087496,-111.7300162)