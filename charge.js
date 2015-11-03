orion.stripe.charge = function(options) {
  check(options, {
    userId: String,
    cardId: Match.Optional(String),
    amount: Number,
    currency: String,
    description: Match.Optional(String),
    metadata: Match.Optional(Object),
    receipt_email: Match.Optional(String),
    shipping: Match.Optional(Object),
    statement_descriptor: Match.Optional(String)
  });

  options.metadata = {} || options.metadata;

  var user = Meteor.users.findOne(options.userId);
  if (!user) throw new Meteor.Error('user-not-found', 'The user was not found');
  if (!user.services.stripe) {
    throw new Meteor.Error('no-stripe-service', 'The user has no stripe connection');
  }
  delete options.userId;
  options.customer = user.services.stripe.id;
  options.metadata.userId = user._id;

  var card = null;
  if (options.cardId) {
    card = orion.stripe.cards.findOne(cardId);
    if (!card) throw new Meteor.Error('card-not-found', 'Card not found');
    delete options.cardId;
    options.source = card.id;
    options.metadata.carId = card._id;
  }

  var charge = orion.stripe.api.charges.create(options);
  orion.stripe.charges.insert(charge);
};
