'use strict';
// Maps controller
angular.module('maps').controller('MapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Maps','$http',
	function($scope, $stateParams, $location, Authentication, Maps, $http) {
		$scope.authentication = Authentication;
  		$scope.contracts = [];
		$scope.find = function () {
			$http.get('/contracts').success(function (response) {
				$scope.contracts = response; console.log($scope.contracts);
			}).error(function (response) {
				$scope.error = repsonse.message;
			});
		};
	}
]);
//Open Modal Window to view and update contract
this.openModal = function (size, selectedContract) {

	var modalInstance = $modal.open({
		templateUrl: '/modules/contracts/views/contract-from-calendar.client.view.html',
		controller: function ($scope, $modalInstance, $stateParams, contract) {
			$scope.contract = contract;

			$scope.ok = function () {
				$modalInstance.close();
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		},
		size: size,
		resolve: {
			contract: function() {
				return selectedContract;
			}
		}
	});
};

