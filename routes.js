const routes = require('next-routes')();

routes
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address/requests', '/campaigns/requests/index');

module.exports = routes;
