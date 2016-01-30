var locationData = [
  {
    locationName: 'Canberra',
    latLng: {lat: 33.282074, lng: -111.1288389},
  },
  
  {
    locationName: 'Sydney',
    latLng: {lat: 33.8675828, lng: -111.2069007}
  },
  
  {
    locationName: 'Wollongong',
    latLng: {lat: 33.4249389, lng: -111.8931158}
  }
];

console.log(locationData);

	var fourSqClientID = 'B3GBLGC2TFDYJCL4HLM44XYRQ5MG1HF1PFBZUWOL0JQNLBL3';
	var fourSqClientSecret = 'ODHJOFM0ABVVHB5AHXHZGPMP3QWOAAWDN4D1RIOL3DEKUVEW';
	var searchTown = 'Fountain Hills, AZ';
	var fourSquareUri = 'https://api.foursquare.com/v2/venues/search?client_id='+ fourSqClientID +
		'&client_secret='+ fourSqClientSecret +
		'&v=20160115'+
		'&near='+ searchTown +
		'&radius=15000'+
		'&query=sushi';

	//function addData () {
	//	 locationData.push({locationName: name, latLng: {lat: lat, lng: lng}});
	//};
	//addData();

var appViewModel = function() {
  var self = this;


function 
  
  function getFourSquare() {
  	$.getJSON(fourSquareUri, function( data ) {

		var venuesLength = data.response.venues.length;		
		var name;
		var lat;
		var lng;
		for (var i = 0; i < venuesLength; i++) {
			name = data.response.venues[i].name;
			lat = data.response.venues[i].location.lat;
			lng = data.response.venues[i].location.lng;
			locationData.push({locationName: name, latLng: {lat: lat, lng: lng}});

		}	  	
	});
  };
  getFourSquare();
  // Build the Google Map object. Store a reference to it.
  var googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.397, lng: -111.644},
    zoom: 8
  });
   
  
  // Build "Place" objects out of raw place data. It is common to receive place
  // data from an API like FourSquare. Place objects are defined by a custom
  // constructor function you write, which takes what you need from the original
  // data and also lets you add on anything else you need for your app, not
  // limited by the original data.
  self.allPlaces = [];
  locationData.forEach(function(place) {
    self.allPlaces.push(new Place(place));
  });

  
  
  // Build Markers via the Maps API and place them on the map.
 		self.allPlaces.forEach(function(place) {
    		var markerOptions = {
      		map: googleMap,
      		position: place.latLng
    	};
    place.marker = new google.maps.Marker(markerOptions);
    // You might also add listeners onto the marker, such as "click" listeners.
  	});
  
  // This array will contain what its name implies: only the markers that should
  // be visible based on user input. My solution does not need to use an 
  // observableArray for this purpose, but other solutions may require that.
  self.visiblePlaces = ko.observableArray([]);
  
  
  // All places should be visible at first. We only want to remove them if the
  // user enters some input which would filter some of them out.
  self.allPlaces.forEach(function(place) {
    self.visiblePlaces.push(place);
  });
  
  
  // This, along with the data-bind on the <input> element, lets KO keep 
  // constant awareness of what the user has entered. It stores the user's 
  // input at all times.
  self.userInput = ko.observable('');
  
  
  // The filter will look at the names of the places the Markers are standing
  // for, and look at the user input in the search box. If the user input string
  // can be found in the place name, then the place is allowed to remain 
  // visible. All other markers are removed.
  self.filterMarkers = function() {
    var searchInput = self.userInput().toLowerCase();
    
    self.visiblePlaces.removeAll();
    
    // This looks at the name of each places and then determines if the user
    // input can be found within the place name.
    self.allPlaces.forEach(function(place) {
      place.marker.setVisible(false);
      
      if (place.locationName.toLowerCase().indexOf(searchInput) !== -1) {
        self.visiblePlaces.push(place);
      }
    });
    
    
    self.visiblePlaces().forEach(function(place) {
      place.marker.setVisible(true);
    });
  };
    
	function Place(data) {
    	this.locationName = data.locationName;
    	this.latLng = data.latLng;
    
    // You will save a reference to the Places' map marker after you build the
    // marker:
    	this.marker = null;
  }





  
};

ko.applyBindings(new appViewModel());

  