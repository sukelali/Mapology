Template.mapology.onRendered(function(){
	GoogleMaps.load();
});

// Template.mapology.helpers({
//   mapologyMapOptions: function() {
//     // Make sure the maps API has loaded
//     if (GoogleMaps.loaded()) {
//       // Map initialization options
//       return {
//         center: new google.maps.LatLng(-37.8136, 144.9631),
//         zoom: 8
//       };
//     }
//   }
// });


Template.mapology.helpers({
    mapologyMapOptions: function() {

    	// Test purpose lat and lon  value setup.

    	Session.set('lat',-37.8136);
    	Session.set('lon',144.9631);
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
        var coords = [Session.get('lat'), Session.get('lon')]   
      return {
        center: new google.maps.LatLng(coords[0],coords[1]),
        scrollwheel: false,
        zoom: 14
      };
    }
  }
});

Template.mapology.created = function () {
    // getUserGeolocation();
  GoogleMaps.ready('mapologyMap', function(map) {

    Venues.find().forEach(function(doc){
        var infowindow = new google.maps.InfoWindow({
                content: [
                    '<header>' + doc.location.name.capitalizeFirstLetter() + '</header>',
                    '<main>' + doc.location.address.capitalizeFirstLetter() + '</main>'].join('')
            });
           var marker = new google.maps.Marker({
          position: new google.maps.LatLng(doc.location.lat, doc.location.lon),
          map: map.instance
        });
        marker.set('title', doc.location.name);

        marker.addListener('click',function(){
        window.location.hash = '#t_' + doc._id;
        infowindow.open(map.instance, marker);
      });
        });

      var marker = new google.maps.Marker({
      position: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
      icon: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png',
      map: map.instance,
      title: "Your Geolocation"
    });     

        $(window).on('resize', function(){
            map.instance.setCenter(new google.maps.LatLng(Session.get('lat'), Session.get('lon')));
        });

  });
};