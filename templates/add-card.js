ReactiveTemplates.request('orionStripe.addCard', 'orionStripeAddCardMaterialize');

addCardSubmit = function(callback) {
  Session.set('orion_autoformLoading', true);
  Session.set('orionStripe_addCard_errors', '');
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val()
  }, function(status, response) {
    if (response.error) {
      Session.set('orionStripe_addCard_errors', response.error.message);
      Session.set('orion_autoformLoading', false);
    } else {
      Meteor.call('orionStripe_addCardMe', response.id, function(error, response) {
        if (error) {
          Session.set('orionStripe_addCard_errors', error.reason);
        } else {
          if (_.isFunction(callback)) {
            callback();
          }
          $('#card-number').val('');
          $('#card-cvc').val('');
          $('#card-expiry-month').val('');
          $('#card-expiry-year').val('');
          Session.set('orion_autoformLoading', false);
        }
      });
    }
  });
};

ReactiveTemplates.onRendered('orionStripe.addCard', function() {
  Session.set('orionStripe_addCard_errors', '');
});

ReactiveTemplates.helpers('orionStripe.addCard', {
  error: function() {
    return Session.get('orionStripe_addCard_errors');
  }
});
