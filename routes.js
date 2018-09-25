const routes = require('next-routes')();

routes
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/new', '/campaigns/new');

module.exports = routes;
