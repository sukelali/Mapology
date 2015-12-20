Router.route('/map', {
  name: 'map',
  template: 'map'
  // waitOn: function() { return [
  //   Meteor.subscribe('Magicmoments')
  //   ]
  // },
  // data: function() {
  //   return {
  //     magicmoments: Magicmoments.find({}, {sort: {createdAt: -1}})
  //   }
  // }
});