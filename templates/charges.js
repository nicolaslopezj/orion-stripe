ReactiveTemplates.request('orionStripe.charges', 'orionStripeChargesMaterialize');

ReactiveTemplates.onCreated('orionStripe.charges', function() {
  this.subscribe('orionStripe_myCharges');
});

ReactiveTemplates.helpers('orionStripe.charges', {
  charges: function() {
    return orion.stripe.charges.find({ 'metadata.userId': Meteor.userId() }, { sort: { created: 1 } });
  },
  getDate: function() {
    return moment(this.created, 'X').format('LLL');
  }
});
