function sushiRestaurant(name) {
	var self = this;	
	self.name = name;
	//self.location = location;
}

function appViewModel(){

	var self = this;

	self.localRestaurant = ko.observableArray([
		
	]);
	

	var fourSqClientID = 'B3GBLGC2TFDYJCL4HLM44XYRQ5MG1HF1PFBZUWOL0JQNLBL3';
	var fourSqClientSecret = 'ODHJOFM0ABVVHB5AHXHZGPMP3QWOAAWDN4D1RIOL3DEKUVEW';
	var searchTown = 'Fountain Hills, AZ';
	var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id='+ fourSqClientID +
		'&client_secret='+ fourSqClientSecret +
		'&v=20160115'+
		'&near='+ searchTown +
		'&radius=20000'+
		'&query=sushi';

	$.getJSON(fourSquareUrl, function( data ) {
		
		var venuesLength = data.response.venues.length;

		
		//self.localRestaurant.push(new sushiRestaurant());		
		var name;
		for (var i = 0; i < venuesLength; i++) {
			name = data.response.venues[i].name;
			self.localRestaurant.push(new sushiRestaurant(name));
		}
	  		
	  	
	});

	var myCenter = new google.maps.LatLng(33.6038895,-111.7262195);
	
	function initialize() {
  		var mapProp = {
    	center: myCenter,
    	zoom:13,
    	mapTypeId:google.maps.MapTypeId.ROADMAP
  	};

  	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

  	var marker = new google.maps.Marker({
		position:myCenter,
	});
	marker.setMap(map);

}
google.maps.event.addDomListener(window, 'load', initialize);

};

ko.applyBindings(new appViewModel());



