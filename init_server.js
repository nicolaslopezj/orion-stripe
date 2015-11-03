Meteor.startup(function () {
  orion.stripe.cards._ensureIndex({
    'metadata.userId': 1,
    id: 1,
    customer: 1
  });

  orion.stripe.charges._ensureIndex({
    'metadata.userId': 1,
    id: 1,
    created: 1
  });
});

Object.defineProperty(orion.stripe, 'api', {
  get: function() {
    return StripeSync(orion.config.get('STRIPE_SECRET_KEY'));
  }
});
