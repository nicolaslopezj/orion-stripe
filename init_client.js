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
  activeRouteRegex: 'orionStripe.charges',
  routeName: 'orionStripe.charges',
  identifier: 'orionStripe-charges',
  parent: 'orionStripe',
  index: 1,
  title: 'Transacciones'
});

orion.links.add({
  activeRouteRegex: 'orionStripe.cards',
  routeName: 'orionStripe.cards',
  identifier: 'orionStripe-cards',
  parent: 'orionStripe',
  index: 2,
  title: 'Tarjetas'
});

Template.registerHelper('stripe_formatAmount', function(amount, currency) {
  return orion.stripe.formatAmount(amount, currency);
});
