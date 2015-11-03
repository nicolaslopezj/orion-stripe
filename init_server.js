Object.defineProperty(orion.stripe, 'api', {
  get: function() {
    return StripeSync(orion.config.get('STRIPE_SECRET_KEY'));
  }
});
