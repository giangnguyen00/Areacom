'use strict';

//Setting up route
angular.module('contracts').config(['$stateProvider',
	function($stateProvider) {
		// Contracts state routing
		$stateProvider.
		state('listContracts', {
			url: '/dashboard/contracts',
			templateUrl: 'modules/contracts/views/list-contracts.client.view.html'
		}).
		state('createContract', {
			url: '/dashboard/contracts/create',
			templateUrl: 'modules/contracts/views/create-contract.client.view.html'
		}).
		state('viewContract', {
			url: '/dashboard/contracts/:contractId',
			templateUrl: 'modules/contracts/views/view-contract.client.view.html'
		}).
		state('editContract', {
			url: '/dashboard/contracts/:contractId/edit',
			templateUrl: 'modules/contracts/views/edit-contract.client.view.html'
		});
	}
]);

