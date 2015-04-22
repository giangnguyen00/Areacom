'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('main', {
			url: '/main',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('main.calendars',{
			views: {	
				url: "/test",
        		'name':{ 
        			templateUrl: 'modules/calendars/views/calendars.client.view.html'	
        		}

      		}
		}).
		state('main.map',{
			views: {	
				url: "/test",
        		'name':{ 
        			templateUrl: 'modules/maps/views/list-maps.client.view.html'	
        		}

      		}
		}).
		state('main.list', {
			views: {
				url: "/test",
				'name':{
					templateUrl: 'modules/contracts/views/list-contracts.client.view.html'
				}
			}
		});
	}
]);