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

    	Session.set('lat',44.6488625);
    	Session.set('lon',-63.5753196);
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
        var coords = [Session.get('lat'), Session.get('lon')]   
        return {
        center: new google.maps.LatLng(coords[0],coords[1]),
        scrollwheel: false,
        zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
         streetViewControl: false,
          mapTypeControl: true,
         mapTypeControlOptions: {
         style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        position: google.maps.ControlPosition.RIGHT_TOP
        }
      };
    }
  }
});

Template.mapology.created = function () {
    // getUserGeolocation();
  GoogleMaps.ready('mapologyMap', function(map) {

    //   var georssLayer = new google.maps.KmlLayer({
    //     url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
    //     position: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
    //     map:map.instance

    //  });
    // georssLayer.setMap(map);

            map.data.loadGeoJson('./test.json');

            // Set the stroke width, and fill color for each polygon
            map.data.setStyle({
              fillColor: 'green',
              strokeWeight: 1
            });

            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
              //ctx.beginPath();
              //ctx.arc(100,100,50,0,Math.PI, true); // outer (filled)
              // the tip of the "pen is now at 0,100
              //ctx.arc(125,75,35,Math.PI,Math.PI*2, false);
              //ctx.lineWidth = 20; 
              //ctx.strokeStyle = 'blue';
              //ctx.stroke();

         map.data.addListener('mouseover', function(event) {
         map.data.revertStyle();
          map.data.overrideStyle(event.feature, {fillColor: '#FF00AA'});
         var area=event.feature.getProperty('AREA');
          
          var val=(area-1126.82550074463)*100/(920585810.729393-1126.82550074463);
          document.getElementById('deprivationGauge').value = Math.round(val);
          ctx.clearRect(0, 0, c.width, c.height);
          if(val<25){
          ctx.beginPath();
          ctx.arc(48,44,35,Math.PI,Math.PI*(1+(val/100)), false);
          ctx.lineWidth = 20; 
          ctx.strokeStyle = 'red';
          ctx.stroke();
          }
          else if(val>25 && val<50){
          ctx.beginPath();
          ctx.arc(48,44,35,Math.PI,Math.PI*(1+(val/100)), false);
          ctx.lineWidth = 20; 
          ctx.strokeStyle = 'blue';
          ctx.stroke();
          }
          else if(val>50){
          ctx.beginPath();
          ctx.arc(48,44,35,Math.PI,Math.PI*(1+(val/100)), false);
          ctx.lineWidth = 20; 
          ctx.strokeStyle = 'green';
          ctx.stroke();
          }
        });
        map.data.addListener('mouseout', function(event) {
          map.data.revertStyle();
        });



     var trafficLayer = new google.maps.TrafficLayer({
      position: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
      map:map.instance
     });
    trafficLayer.setMap(map);

    var transitLayer = new google.maps.TransitLayer({
      position: new google.maps.LatLng(Session.get('lat'), Session.get('lon')),
      map:map.instance
    });
    transitLayer.setMap(map);


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