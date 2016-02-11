// array that stores content from the JSON 
var locationData = [];
// foursquare variables for JSON request
	var fourSqClientID = 'B3GBLGC2TFDYJCL4HLM44XYRQ5MG1HF1PFBZUWOL0JQNLBL3';
	var fourSqClientSecret = 'ODHJOFM0ABVVHB5AHXHZGPMP3QWOAAWDN4D1RIOL3DEKUVEW';
	var searchTown = 'Fountain Hills, AZ';
	var fourSquareUri = 'https://api.foursquare.com/v2/venues/search?client_id='+ fourSqClientID +
		'&client_secret='+ fourSqClientSecret +
		'&v=20160115'+
		'&near='+ searchTown +
		'&radius=15000'+
		'&query=sushi';
// function that creates content for the infoWindow
function createContent(name, phone, address) {
	return '<div><h2>' + name + '</h2></div><div><h4>' + phone + '</h4></div><div><p>' + address + '</p></div>';
}
//callback function to async load googleMap
var googleMap;
function initMap() {
	googleMap = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.5, lng: -111.9333},
		zoom: 11
	});
	ko.applyBindings(new appViewModel());
};

function googleError() {
	alert("Hello?  Google?  Are you there?");
};

var appViewModel = function() {
	var self = this;
	var name, lat, lng, address, phone;
	// JSON request to FourSquare
	$.getJSON(fourSquareUri, function( data ) {
		var venuesLength = data.response.venues.length;
		for (var i = 0; i < venuesLength; i++) {			
			name = data.response.venues[i].name;
			lat = data.response.venues[i].location.lat;
			lng = data.response.venues[i].location.lng;
			address = data.response.venues[i].location.address;
			phone = data.response.venues[i].contact.formattedPhone;
			if (address && phone) {
				locationData.push({locationName: name, latLng: {lat: lat, lng: lng}, locationAddress: address, locationPhone: phone});
			};
		};
		//run function to populate array after the data from JSON request is received
		setData();
	})
//alerts user that servers are down
	.error(function() {
		alert("Sorry, no sushi for you.  The servers are down.");
	});
// new infowindow
	var InfoWindow = new google.maps.InfoWindow();
// stores all place objects
	self.allPlaces = [];
// array stores all filtered locations 
	self.visiblePlaces = ko.observableArray([]);
// this is the user input for the filter
	self.userInput = ko.observable(''); 
// process to get data and run infoWindow
	function oneBounce(marker){
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			marker.setAnimation(null);
		},750);
	};

	function setData() {
//function to create an instance of Place
		self.Place = function (data) {
			this.locationName = data.locationName;
			this.latLng = data.latLng;
			this.address = data.locationAddress;
			this.phone = data.locationPhone;
			this.marker = null;
			this.InfoWindowOptions = {
				position: data.latLng,
				pixelOffset: new google.maps.Size(0, -20),
				content: createContent(data.locationName, data.locationPhone, data.locationAddress)
			};
			//allows for ko.to open window with button click
			this.selectLocation = function() {
				InfoWindow.setOptions(this.InfoWindowOptions);
				InfoWindow.open(googleMap, this.marker);
				oneBounce(this.marker);
			};
		};
		// pushes instances of place into array
		locationData.forEach(function(place) {
			self.allPlaces.push(new self.Place(place));
		});
// for each place in array sets location and options for marker
		self.allPlaces.forEach(function(place) {
			var markerOptions = {
				map: googleMap,
				position: place.latLng,
				draggable: false,
				animation: google.maps.Animation.DROP
			};
			var InfoWindowOptions = {
				position: place.latLng,
				pixelOffset: new google.maps.Size(0, -20),
				content: createContent(place.locationName, place.phone, place.address)
			};
// creates a new marker with options
			place.marker = new google.maps.Marker(markerOptions);
// listener for marker - opens infoWindow and toggles bounce
			place.marker.addListener('click', function() {
// sets InfoWindowOptions for place
				InfoWindow.setOptions(InfoWindowOptions);
				InfoWindow.open(googleMap, place.marker);
				oneBounce(place.marker);
			});
		});
// takes each place in the allPlaces array and pushes them into the KO observable array
		self.allPlaces.forEach(function(place) {
			self.visiblePlaces.push(place);
		});
	};
// filter looks to the KO observable array and checks for matching conditions of the user input into filter bar
	self.filterMarkers = function(place) {
	// sets all inputs to lowercase 
		var searchInput = self.userInput().toLowerCase();
	// removes all visible places
		self.visiblePlaces.removeAll();
	// looks over each place in allPlaces array 
		self.allPlaces.forEach(function(place) {
	// sets are markers to not visible
			place.marker.setVisible(false);
	// anything at is at the index of the search should be pushed to the visible array
			if (place.locationName.toLowerCase().indexOf(searchInput) !== -1) {
				self.visiblePlaces.push(place);
			}
		});
	// sets all markers to visible in the visiblePlaces KO observable array
		self.visiblePlaces().forEach(function(place) {
		  place.marker.setVisible(true);
		});
	};
};
