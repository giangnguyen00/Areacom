'use strict';

var customersApp = angular.module('customers');
// Customers controller
customersApp.controller('CustomersController', ['$scope', '$stateParams', 'Authentication', 'Customers','$modal', '$log','$http',
	function($scope, $stateParams, Authentication, Customers, $modal, $log, $http) {
        this.authentication = Authentication;
        // Find a list of Customers
        this.customers = Customers.query();

        $scope.userList = {};
        $scope.getUsers = function(){
            $http.get('/users/list').success(function(response){
               $scope.userList = response;

                console.log(response);

                // And redirect to the index page
                //$location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        //open a modal window to create a single user record
        this.modalCreate = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'modules/customers/views/create-customer.client.view.html',
                controller: function ($scope, $modalInstance) {

                    $scope.ok = function () {

                        if(!createCustomerForm.$invalid)
                        {
                            $modalInstance.close();
                        }
                        //$modalInstance.close($scope.customer);

                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },

                size: size,

            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        //open a modal window to update a single user record
        $scope.modalUpdate = function (size, selectedCustomer) {
            console.log("open");
            var modalInstance = $modal.open({
                templateUrl: 'modules/customers/views/edit-customer.client.view.html',
                controller: function ($scope, $modalInstance, customer) {
                    $scope.customer = customer;

                    $scope.ok = function () {

                        if(!updateCustomerForm.$invalid)
                        {
                            $modalInstance.close($scope.customer);
                        }
                            //$modalInstance.close($scope.customer);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },

                size: size,
                resolve: {
                    customer: function () {
                        return selectedCustomer;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //Update existing
        this.update = function(updatedCustomer) {
            console.log("Now calling the Update Method");
            var customer = updatedCustomer;
            console.log(updatedCustomer);
            $http.post('/users/update', customer).success(function(response) {

            }).error(function(response) {
                $scope.error = response.message;
            });

            //customer.$update(function() {
            //},function(errorResponse) {
            //    this.error = errorResponse.data.message;
            //});
        };


        //// Remove existing Customer
        $scope.test = function(customer) {
            console.log("Now calling the remove Method");
        	if ( customer ) {
        		customer.$remove();
                console.log("got here");
        		for (var i in $scope.userList) {
        			if ($scope.userList [i] === customer) {
                        $scope.userList.splice(i, 1);
        			}
        		}
        	} else {
                $scope.userList.$remove(function() {
                    //$location.path('customers');
        		});
        	}

            console.log("Now finishing the remove Method");
        };


    }
]);

customersApp.controller('CustomersCreateController', ['$scope', 'Customers', 'Notify',
    function($scope, Customers, Notify) {

        // Create new Customer
        this.create = function() {
        	// Create new Customer object
        	var customer = new Customers ({
               firstName: this.firstName,
               lastName: this.lastName,
               userName: this.userName,
                password: this.password,
               email: this.email,
               phone:this.phone


        });


        	// Redirect after save
        	customer.$save(function(response) {

                Notify.sendMsg('NewCustomer', {'id': response._id});

        		//// Clear form fields
        		//$scope.firstName = '';
               //$scope.lastName = '';
               //$scope.country = '';
               //$scope.email = '';
               //$scope.phone = '';

        	}, function(errorResponse) {
        		$scope.error = errorResponse.data.message;
        	});
        };
    }
]);

customersApp.controller('CustomersUpdateController', ['$scope', 'Customers',
    function($scope, Customers) {

        //// Update existing Customer
        //this.update = function(updatedCustomer) {
        //    console.log("Now calling the Update Method");
        //	var customer = updatedCustomer;
        //	customer.$update(function() {
        //	},function(errorResponse) {
        //		$scope.error = errorResponse.data.message;
        //	});
        //};
    }
]);

customersApp.directive('customerList', ['Customers','Notify', function(Customers, Notify){
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'modules/customers/views/customer-list-template.html',
        link: function($scope, element, attrs){

            //When a new customer is added, update the customer list

            Notify.getMsg('NewCustomer', function(event, data){
                $scope.CustomerCtrl.customers = Customers.query();
            });
        }
    };
}]);

