Meteor.methods({
  orionStripe_syncMe: function() {
    var user = Meteor.users.findOne(this.userId);
    if (!user) throw new Meteor.Error('user-not-found', 'The user was not found');

    if (!user.services.stripe) {
      var response = orion.stripe.api.customers.create({
        description: user._id,
        email: user.emails && user.emails[0] && user.emails[0].address
      });
      Meteor.users.update(user._id, { $set: { 'services.stripe': response } });
    } else {
      var stripeId = user.services.stripe.id;
      var userStripe = orion.stripe.api.customers.retrieve(stripeId);
      Meteor.users.update(user._id, { $set: { 'services.stripe': userStripe } });
    }
    user = Meteor.users.findOne(user._id);

    var userCards = orion.stripe.api.customers.listCards(user.services.stripe.id);
    console.log(userCards);
  },
  orionStripe_addCardMe: function(token) {
    check(token, String);
    var user = Meteor.users.findOne(this.userId);
    if (!user) throw new Meteor.Error('user-not-found', 'The user was not found');

    if (!user.services.stripe) {
      throw new Meteor.Error('no-stripe-service', 'The user has no stripe connection');
    }

    var card = orion.stripe.api.customers.createSource(user.services.stripe.id, {
      source: token,
      metadata: {
        userId: user._id
      }
    });

    orion.stripe.cards.insert(card);
  },
  orionStripe_removeCard: function(cardId) {
    check(cardId, String);
    Roles.checkPermission(this.userId, 'orionStripe.removeCard', cardId);

    var card = orion.stripe.cards.findOne(cardId);
    if (!card) throw new Meteor.Error('card-not-found', 'Card not found');
    var user = Meteor.users.findOne(card.metadata.userId);
    if (!user) throw new Meteor.Error('user-not-found', 'User not found');
    if (!user.services.stripe) {
      throw new Meteor.Error('no-stripe-service', 'The user has no stripe connection');
    }

    var response = stripe.customers.deleteCard(user.services.stripe.id, card.id);
    if (response.deleted) {
      return orion.stripe.cards.remove(cardId);
    }
  }
});
