'use strict';

// Contracts controller
angular.module('contracts').controller('ContractsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Contracts',
	function($scope, $stateParams, $location, Authentication, Contracts) {
		$scope.authentication = Authentication;
		this.contracts= Contracts.query();
		// Create new Contract
		$scope.create = function() {
			// Create new Contract object
			var contract = new Contracts ({
				name: this.name,
				tcsiteID: this.tcsiteID,
				tositeID: this.tositeID,
				towner: this.towner,
				pobox: this.pobox,
				numdish: this.numdish,
				StartDate: this.StartDate,
				EndDate: this.EndDate,
				address: this.address,
				city: this.city,
				state: this.state,
				zip: this.zip,
				lat: this.lat,
				longit: this.longit,
				ntp: this.ntp,
				towerbool: this.towerbool,
				notes: this.notes
			});

			// Redirect after save
			contract.$save(function(response) {
				$location.path('contracts/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.StartDate = '';
				$scope.tcsiteID = '';
				$scope.tositeID= '';
				$scope.towner= '';
				$scope.pobox= '';
				$scope.numdish= '';
				$scope.address= '';
				$scope.city= '';
				$scope.state='';
				$scope.zip= '';
				$scope.EndDate= '';
				$scope.longit= '';
				$scope.lat = '';
				$scope.ntp = '';
				$scope.towerbool = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		// Remove existing Contract
		$scope.remove = function(contract) {
			if ( contract ) { 
				contract.$remove();

				for (var i in $scope.contracts) {
					if ($scope.contracts [i] === contract) {
						$scope.contracts.splice(i, 1);
					}
				}
			} else {
				$scope.contract.$remove(function() {
					$location.path('contracts');
				});
			}
		};

		// Update existing Contract
		$scope.update = function() {
			var contract = $scope.contract;

			contract.$update(function() {
				$location.path('contracts');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		$scope.selectedContract = {};
		$scope.currentView = function(view){
			$scope.showView = true;
			$scope.selectedContract = view;
		};
		//
		this.removeContractFromModal = function(removedContract) {
			var contract = removedContract
			if ( contract ) { 
				contract.$remove();

				for (var i in this.contracts) {
					if (this.contracts [i] === contract) {
						this.contracts.splice(i, 1);
					}
				}
			} else {
				this.contract.$remove(function() {
				});
			}
			// $scope.find();
			// $rootScope.$broadcast("remove Contract", $scope.contracts);
			
		};

		// Update existing contract from modal View from Calendar
		this.updateContractFromModal = function(updatedContract) {
			var contract = updatedContract;
			//alert(contract.StartDate);

			contract.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contracts
		$scope.find = function() {
			$scope.contracts = Contracts.query();
			// $scope.contracts = Contracts.query().$promise.then(function(data){
			// });
		};

		// Find existing Contract
		$scope.findOne = function() {
			$scope.contract = Contracts.get({ 
				contractId: $stateParams.contractId
			});
		};
	}
]);