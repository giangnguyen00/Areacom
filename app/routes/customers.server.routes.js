'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var customers = require('../../app/controllers/customers.server.controller');

	// Customers Routes
	app.route('/customers')
		.get(customers.list)
		.post(users.requiresLogin, customers.create);

	app.route('/customers/:customerId')
		.get(customers.read)
		.put(users.requiresLogin, customers.hasAuthorization, customers.update)
		.delete(users.requiresLogin, customers.hasAuthorization, customers.delete);

    //app.route('/customers/list')
    //    .get(customers.read);

	// Finish by binding the Customer middleware
	app.param('customerId', customers.customerByID);
};
