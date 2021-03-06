'use strict';

angular.module('users').controller('AuthenticationController', ['$rootScope', '$scope', '$http', '$location', 'Authentication',
	function($rootScope, $scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		//if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				console.log(response);

				// And redirect to the index page
				//$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/main');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.signout = function() {
			$http.get('/auth/signout', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = '';

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		var test = $rootScope.$on('$locationChangeStart', function(event, next, current) {
	    	//var auth = Authentication;
	    	console.log(next);
	    	console.log($scope.authentication);
	    	console.log(next.substring(next.length-4, next.length) != '/#!/');
	    	console.log(next.substring(next.length-4, next.length) != '/#!/' && $scope.authentication.user == "");
	        if((next.substring(next.length-4, next.length) != '/#!/') && $scope.authentication.user == '') {
	        	$location.path('/');
	        	console.log("hello");
	        }
	        else {
		        console.log($scope.authentication.user);
		        console.log(next.substring(next.length-4, next.length) != '/#!/');
		    	console.log(next.substring(next.length-4, next.length) != '/#!/' && $scope.authentication.user == "");
	        }
	        test();
    	});
	}
]);