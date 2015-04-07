'use strict';

// Calendars controller
angular.module('calendars').controller('CalendarsController', ['$scope', 'Contracts', '$modal', '$log', '$rootScope',
	function($scope, Contracts, $modal, $log, $rootScope) {
		// Controller Logic
		// ...
		$scope.day = moment();

        $scope.find = function() {
            $scope.contracts = Contracts.query();
        };

        $scope.dateMatch = function(day, contract){
            return moment(day).format("MM/DD/YYYY") == moment(contract.StartDate).format("MM/DD/YYYY");
        }
        $scope.compareDate = function(day){
            var result = false;
            var date1 = moment(day).format('MM/DD/YYYY');
            alert(date1);
            angular.forEach(scope.contracts, function(value){
                 var date2 = moment(value.StartDate).format('MM/DD/YYYY');
                 if(date1 == date2){
                     result = true;
                 }
                   
            });
            return result;
        };
        // $scope.$on("remove Contract", function(event, data){
        //     console.log(data);
        //     $scope.contracts = data;
            
        // });

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

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

	}
]);