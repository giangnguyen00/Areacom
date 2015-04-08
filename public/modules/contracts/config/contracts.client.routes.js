'use strict';

//Setting up route
angular.module('contracts').config(['$stateProvider',
	function($stateProvider) {
		// Contracts state routing
		$stateProvider.
		state('listContracts', {
			url: '/contracts',
			templateUrl: 'modules/contracts/views/list-contracts.client.view.html'
		}).
		state('createContract', {
			url: '/contracts/create',
			templateUrl: 'modules/contracts/views/create-contract.client.view.html'
		}).
		state('viewContract', {
			url: '/contracts/:contractId',
			templateUrl: 'modules/contracts/views/view-contract.client.view.html'
		}).
		state('editContract', {
			url: '/contracts/:contractId/edit',
			templateUrl: 'modules/contracts/views/edit-contract.client.view.html'
		});
	}
]);

/*angular.module('contracts').run(['$state', '$rootScope', 'Authentication', function($state, $rootScope, Authentication) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    	$scope.authentication = Authentication;
        if (!authentication.user) {
            // whatever you want to do
            event.preventDefault();//prevent change​​

            //$state.go('/');
        };
        ​// more code here

    });
}]);*/