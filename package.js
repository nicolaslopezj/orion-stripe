Package.describe({
  name: 'orionsoft:orion-stripe',
  summary: 'Orion integration with stripe payments',
  version: '0.0.1',
  git: 'https://github.com/orionsoft/orion-stripe'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['meteor-platform']);


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('orionjs:core');
});
