// admins can remove any card
Roles.registerAction('orionStripe.removeCard', true);

// users can remove their cards
Roles.loggedInRole.allow('orionStripe.removeCard', function(cardId) {
  var card = orion.stripe.cards.findOne(cardId);
  if (card.userId === this.userId) {
    return true;
  }
});
