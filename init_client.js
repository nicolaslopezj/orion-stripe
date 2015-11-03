Meteor.startup(function() {
  Stripe.setPublishableKey(orion.config.get('STRIPE_PUBLISHABLE_KEY'));
});

orion.links.add({
  activeRouteRegex: 'orionStripe',
  identifier: 'orionStripe',
  index: 100,
  title: 'Pagos'
});

orion.links.add({
  activeRouteRegex: 'orionStripe',
  identifier: 'orionStripe-history',
  parent: 'orionStripe',
  index: 1,
  title: 'Transacciones'
});

orion.links.add({
  activeRouteRegex: 'orionStripe',
  routeName: 'orionStripe.cards',
  identifier: 'orionStripe-cards',
  parent: 'orionStripe',
  index: 2,
  title: 'Tarjetas'
});
