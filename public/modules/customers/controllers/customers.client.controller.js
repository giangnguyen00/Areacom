'use strict';

var customersApp = angular.module('customers');
// Customers controller
customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers',
	function($scope, $stateParams, Authentication, Customers) {
        this.authentication = Authentication;

        // Find a list of Customers
            this.customers = Customers.query();
}
]);

customersApp.controller('CustomersCreateController', ['$scope', 'Customers',
    function($scope, Customers) {

    }
]);

customersApp.controller('CustomersEditController', ['$scope', 'Customers',
    function($scope, Customers) {

    }
]);

        //
        //
		//// Create new Customer
		//$scope.create = function() {
		//	// Create new Customer object
		//	var customer = new Customers ({
         //       firstName: this.firstName,
         //       lastName: this.lastName,
         //       userName: this.userName,
        //        password: this.password,
         //       email: this.email,
         //       phone:this.phone
        //
        //});
        //
		//	// Redirect after save
		//	customer.$save(function(response) {
		//		$location.path('customers/' + response._id);
        //
		//		// Clear form fields
		//		$scope.firstName = '';
         //       $scope.lastName = '';
         //       $scope.country = '';
         //       $scope.email = '';
         //       $scope.phone = '';
        //
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
        //
		//	});
		//};
        //
		//// Remove existing Customer
		//$scope.remove = function(customer) {
		//	if ( customer ) {
		//		customer.$remove();
        //
		//		for (var i in $scope.customers) {
		//			if ($scope.customers [i] === customer) {
		//				$scope.customers.splice(i, 1);
		//			}
		//		}
		//	} else {
		//		$scope.customer.$remove(function() {
		//			$location.path('customers');
		//		});
		//	}
		//};
        //
		//// Update existing Customer
		//$scope.update = function() {
		//	var customer = $scope.customer;
        //
		//	customer.$update(function() {
		//		$location.path('customers/' + customer._id);
		//	}, function(errorResponse) {
		//		$scope.error = errorResponse.data.message;
		//	});
		//};
        //
        //
        //
		//// Find existing Customer
		//$scope.findOne = function() {
		//	$scope.customer = Customers.get({
		//		customerId: $stateParams.customerId
		//	});
		//};