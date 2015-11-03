ReactiveTemplates.request('orionStripe.cards', 'orionStripeCardsMaterialize');

ReactiveTemplates.onCreated('orionStripe.cards', function() {
  this.subscribe('orionStripe_myCards');
});

ReactiveTemplates.helpers('orionStripe.cards', {
  cards: function() {
    return orion.stripe.cards.find({ 'metadata.userId': Meteor.userId() });
  },
  hasPermissionToDelete: function() {
    return Roles.userHasPermission(Meteor.userId(), 'orionStripe.removeCard', this._id);
  }
});


ReactiveTemplates.events('orionStripe.cards', {
  'click .add-card-btn': function() {
    $('#add-card-modal').openModal();
  },
  'click .add-card-save': function() {
    addCardSubmit(function() {
      $('#add-card-modal').closeModal();
    });
  },
  'click .delete-card-btn': function() {
    Meteor.call('orionStripe_removeCard', this._id);
  }
});
