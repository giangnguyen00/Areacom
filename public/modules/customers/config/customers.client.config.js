'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Users', 'customers', 'dropdown', '/customers(/create)?');
        //Menus.addMenuItem('topbar', 'Users', 'customers', '/customers');
		//Menus.addSubMenuItem('topbar', 'customers', 'List Users', '/customers');
	}
]);