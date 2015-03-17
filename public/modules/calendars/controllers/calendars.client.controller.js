'use strict';

// Calendars controller
angular.module('calendars').controller('CalendarsController', ['$scope', 'Contracts', '$modal', '$log',
	function($scope, Contracts, $modal, $log) {
		// Controller Logic
		// ...
		$scope.day = moment();

        $scope.find = function() {
            $scope.contracts = Contracts.query();
        };

        //Open Modal Window to 
        this.openModal = function (size, selectedContract) {

            var modalInstance = $modal.open({
                templateUrl: '/modules/contracts/views/view-contract-from-calendar.client.view.html',
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

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

	}
]);