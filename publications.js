Meteor.publish('orionStripe_myCards', function() {
  if (!this.userId) return [];
  return orion.stripe.cards.find({ 'metadata.userId': this.userId }, { fields: { brand: 1, country: 1, exp_month: 1, exp_year: 1, funding: 1, last4: 1, 'metadata.userId': 1 } });
});

Meteor.publish('orionStripe_myCharges', function() {
  if (!this.userId) return [];
  return orion.stripe.charges.find({ 'metadata.userId': this.userId }, { fields: { amount: 1, currency: 1, description: 1, created: 1, 'source.brand': 1, 'source.last4': 1, 'metadata.userId': 1 } });
});
