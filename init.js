orion.stripe = {};

orion.stripe.cards = new Meteor.Collection('orionStripe_cards');

orion.config.add('STRIPE_PUBLISHABLE_KEY', 'stripe', { public: true });
orion.config.add('STRIPE_SECRET_KEY', 'stripe');

ReactiveTemplates.request('accounts.update');
RouterLayer.route('/admin/payments/cards', {
  layout: 'layout',
  template: 'orionStripe.cards',
  name: 'orionStripe.cards',
  reactiveTemplates: true
});
orion.accounts.addProtectedRoute('orionStripe.cards');
