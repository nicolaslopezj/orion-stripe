orion.stripe = {};

orion.stripe.cards = new Mongo.Collection('orionStripe_cards');
orion.stripe.charges = new Mongo.Collection('orionStripe_charges');
orion.stripe.decimalCurrencies = ['bif', 'djf', 'jpy', 'krw', 'pyg', 'vnd', 'xaf', 'xpf', 'clp', 'gnf', 'kmf', 'mga', 'rwf', 'vuv', 'xof'];
orion.stripe.formatAmount = function(amount, currency) {
  var format = '$0,0.[00]';
  if (!_.contains(orion.stripe.decimalCurrencies, currency.toLowerCase())) {
    amount = amount * 0.01;
    format = '$0,0.00';
  }
  return currency.toUpperCase() + ' ' + numeral(amount).format(format);
};


orion.config.add('STRIPE_PUBLISHABLE_KEY', 'stripe', { public: true });
orion.config.add('STRIPE_SECRET_KEY', 'stripe');

RouterLayer.route('/admin/payments/cards', {
  layout: 'layout',
  template: 'orionStripe.cards',
  name: 'orionStripe.cards',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('orionStripe.cards');

RouterLayer.route('/admin/payments/charges', {
  layout: 'layout',
  template: 'orionStripe.charges',
  name: 'orionStripe.charges',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('orionStripe.charges');
