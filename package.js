Package.describe({
  name: 'orionsoft:orion-stripe',
  summary: 'Orion integration with stripe payments',
  version: '0.0.1',
  git: 'https://github.com/orionsoft/orion-stripe'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'meteor-platform',
    'orionjs:core@1.6.0',
    'copleykj:stripe-sync@2.0.5',
    'numeral:numeral@1.5.1',
    'momentjs:moment@2.10.6'
  ]);

  api.imply([
    'copleykj:stripe-sync',
    'numeral:numeral',
    'momentjs:moment'
  ]);

  api.addFiles([
    'init.js',
    'roles.js',
    'i18n/en.js',
    'i18n/es.js'
  ]);

  api.addFiles([
    'init_server.js',
    'methods.js',
    'publications.js',
    'charge.js'
  ], 'server');

  api.addFiles([
    'init_client.js',
    'templates/cards.html',
    'templates/cards.js',
    'templates/add-card.html',
    'templates/add-card.js',
    'templates/charges.html',
    'templates/charges.js'
  ], 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
