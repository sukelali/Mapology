if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    map: function(){
      map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: {lat: -28, lng: 137}
      });

      // NOTE: This uses cross-domain XHR, and may not work on older browsers.
      map.data.loadGeoJson('./test.json');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
