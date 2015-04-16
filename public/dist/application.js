'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils', 'ngMap'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('calendars');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('contracts');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('customers');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('maps');
'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users');
//'use strict';
//
//// Configuring the Articles module
//angular.module('calendars').run(['Menus',
//	function(Menus) {
//		// Set top bar menu items
//		Menus.addMenuItem('topbar', 'Calendars', 'calendars', 'dropdown', '/calendars(/create)?');
//		Menus.addSubMenuItem('topbar', 'calendars', 'List Calendars', 'calendars');
//		Menus.addSubMenuItem('topbar', 'calendars', 'New Calendar', 'calendars/create');
//	}
//]);
'use strict';

//Setting up route
angular.module('calendars').config(['$stateProvider',
	function($stateProvider) {
		// Calendars state routing
		$stateProvider.
		state('listCalendars', {
			url: '/calendars',
			templateUrl: 'modules/calendars/views/list-calendars.client.view.html'
		}).
		state('createCalendar', {
			url: '/calendars/create',
			templateUrl: 'modules/calendars/views/create-calendar.client.view.html'
		}).
		state('viewCalendar', {
			url: '/calendars/:calendarId',
			templateUrl: 'modules/calendars/views/view-calendar.client.view.html'
		}).
		state('editCalendar', {
			url: '/calendars/:calendarId/edit',
			templateUrl: 'modules/calendars/views/edit-calendar.client.view.html'
		});
	}
]);
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
                controller: ["$scope", "$modalInstance", "$stateParams", "contract", function ($scope, $modalInstance, $stateParams, contract) {
                    $scope.contract = contract;

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
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
'use strict';

angular.module('calendars').directive('calendars', [
	function() {
		function _removeTime(date) {
			return date.day(0).hour(0).minute(0).second(0).millisecond(0);
		}

		function _buildMonth(scope, start, month) {
			scope.weeks = [];
			var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
			while (!done) {
				scope.weeks.push({ days: _buildWeek(date.clone(), month) });
				date.add(1, 'w');
				done = count++ > 2 && monthIndex !== date.month();
				monthIndex = date.month();
			}
		}

		function _buildWeek(date, month) {
			var days = [];
			for (var i = 0; i < 7; i++) {
				days.push({
					name: date.format('dd').substring(0, 1),
					number: date.date(),
					isCurrentMonth: date.month() === month.month(),
					isToday: date.isSame(new Date(), 'day'),
					date: date
				});
				date = date.clone();
				date.add(1, 'd');
			}
			return days;
		}

		return {
			restrict: 'E',
			templateUrl: 'modules/calendars/views/calendars.template.client.view.html',
            scope: {
				selected: '=',
                contracts: '='
			},
			link: function (scope) {


                scope.selected = _removeTime(scope.selected || moment());
				scope.month = scope.selected.clone();

				//select current date as default
				scope.selected = moment();

				var start = scope.selected.clone();
				start.date(1);
				_removeTime(start.day(0));

				_buildMonth(scope, start, scope.month);

				scope.select = function (day) {
					scope.selected = day.date;
				};

				scope.next = function () {
					var next = scope.month.clone();
					_removeTime(next.month(next.month() + 1).date(1));
					scope.month.month(scope.month.month() + 1);
					_buildMonth(scope, next, scope.month);
				};

				scope.previous = function () {
					var previous = scope.month.clone();
					_removeTime(previous.month(previous.month() - 1).date(1));
					scope.month.month(scope.month.month() - 1);
					_buildMonth(scope, previous, scope.month);
				};

                scope.hasContract = function(day) {
                	var date1 = moment(day.date).format('MM/DD/YYYY');
                    var result = false;
                    angular.forEach(scope.contracts ,function(value, index){
                    	var date2 = moment(value.StartDate).format('MM/DD/YYYY');
                        if(date1 == date2) {
                            result = true;
                        }
                    });
                    return result;
                };
                
	            scope.goToday = function() {
	            	var result = false;
	            	console.log(1);
	            	scope.month = scope.selected.clone();
					scope.selected = moment();
					var start = scope.selected.clone();
					start.date(1);
					_removeTime(start.day(0));
					_buildMonth(scope, start, scope.month);
					result = true;
					console.log(0);
					return result;
	            };
		}
		};

	}
]);
'use strict';

//Calendars service used to communicate Calendars REST endpoints
angular.module('calendars').factory('Calendars', ['$resource',
	function($resource) {
		return $resource('calendars/:calendarId', { calendarId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('contracts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Contracts', 'contracts', 'dropdown', '/contracts(/create)?');
		Menus.addMenuItem('topbar', 'Contracts', 'contracts', '/contracts(/create)?');
		//Menus.addSubMenuItem('topbar', 'contracts', 'List Contracts', 'contracts');
		//Menus.addSubMenuItem('topbar', 'contracts', 'New Contract', 'contracts/create');
	}
]);
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
				$location.path('contracts/' + contract._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

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
'use strict';

//Contracts service used to communicate Contracts REST endpoints
angular.module('contracts').factory('Contracts', ['$resource',
	function($resource) {
		return $resource('contracts/:contractId', { contractId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
        //console.log($scope.authentication);
        //console.log($scope.authentication.user.roles[0]=='user');
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$state',
    function($scope, Authentication, $state) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.changeState = function(){
            $state.go('main.calendars');
        };
    }
]);


'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('customers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Users', 'customers', 'dropdown', '/customers(/create)?');
        //Menus.addMenuItem('topbar', 'Users', 'customers', '/customers');
		//Menus.addSubMenuItem('topbar', 'customers', 'List Users', '/customers');
	}
]);
'use strict';

//Setting up route
angular.module('customers').config(['$stateProvider',
	function($stateProvider) {
		// Customers state routing
		$stateProvider.
		state('listCustomers', {
			url: '/customers',
			templateUrl: 'modules/customers/views/list-customers.client.view.html'
		});
	}
]);
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
                controller: ["$scope", "$modalInstance", function ($scope, $modalInstance) {

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
                }],

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
                controller: ["$scope", "$modalInstance", "customer", function ($scope, $modalInstance, customer) {
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
                }],

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
            $http.post('/users/update', customer).success(function(response) {

            }).error(function(response) {
                $scope.error = response.message;
            });

            //customer.$update(function() {
            //},function(errorResponse) {
            //    this.error = errorResponse.data.message;
            //});
        };


        // Remove existing Customer
        $scope.remove = function(customer) {
            console.log("Now calling the remove Method");
            var cust = customer;
            if(cust.roles == 'user')
            {
                console.log("user");
            }

                $http.post('/users/delete', cust).success(function(response) {
                    console.log("called post");
                    //customer.$remove();

                    //for (var i in $scope.userList) {
                    //	if ($scope.userList [i] === customer) {
                    //       $scope.userList.splice(i, 1);
                    //	}
                    //}
                }). error(function(response) {
                    console.log("error");
                    $scope.error = response.message;
                });
            console.log("end post");
        };

        //// Remove existing Customer
        //$scope.remove = function(customer) {
        //
        //    console.log("Now calling the remove Method");
        //    if ( customer ) {
        //        customer.$remove();
        //
        //        for (var i in $scope.customers) {
        //            if ($scope.customers [i] === customer) {
        //                $scope.customers.splice(i, 1);
        //            }
        //        }
        //    } else {
        //        $scope.customer.$remove(function() {
        //            $location.path('customers');
        //        });
        //    }
        //};

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


'use strict';

//Customers service used to communicate Customers REST endpoints

angular.module('customers')

    .factory('Customers', ['$resource',
        function($resource) {
            return $resource('customers/:customerId', { customerId: '@_id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }
    ])


    .factory('Notify', ['$rootScope', function($rootScope) {

        var notify = {};
        notify.sendMsg = function(msg, data){
            data = data || {};
            $rootScope.$emit(msg,data);

            console.log('message sent!');
        };

        notify.getMsg = function(msg, func, scope){

            var unbind = $rootScope.$on(msg, func);
             if(scope){
                 scope.$on('destroy', unbind);
             }
        };

        return notify;
    }
    ]);
'use strict';

// Configuring the Articles module
angular.module('maps').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Maps', 'maps', '/maps(/create)?');
		//Menus.addSubMenuItem('topbar', 'maps', 'List Maps', 'maps');
		//Menus.addSubMenuItem('topbar', 'maps', 'New Map', 'maps/create');
	}
]);
'use strict';

//Setting up route
angular.module('maps').config(['$stateProvider',
	function($stateProvider) {
		// Maps state routing
		$stateProvider.
		state('listMaps', {
			url: '/maps',
			templateUrl: 'modules/maps/views/list-maps.client.view.html'
		}).
		state('createMap', {
			url: '/maps/create',
			templateUrl: 'modules/maps/views/create-map.client.view.html'
		}).
		state('viewMap', {
			url: '/maps/:mapId',
			templateUrl: 'modules/maps/views/view-map.client.view.html'
		}).
		state('editMap', {
			url: '/maps/:mapId/edit',
			templateUrl: 'modules/maps/views/edit-map.client.view.html'
		});
	}
]);
'use strict';

// Maps controller
angular.module('maps').controller('MapsController', ['$scope', 'Contracts', '$stateParams', '$location', 'Authentication', 'Maps',
	function($scope, $stateParams, $location, Authentication, Maps) {
		$scope.authentication = Authentication;

		// Create new Map
		$scope.create = function() {
			// Create new Map object
			var map = new Maps ({
				name: this.name
			});

			// Redirect after save
			map.$save(function(response) {
				$location.path('maps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Map
		$scope.remove = function(map) {
			if ( map ) { 
				map.$remove();

				for (var i in $scope.maps) {
					if ($scope.maps [i] === map) {
						$scope.maps.splice(i, 1);
					}
				}
			} else {
				$scope.map.$remove(function() {
					$location.path('maps');
				});
			}
		};

		// Update existing Map
		$scope.update = function() {
			var map = $scope.map;

			map.$update(function() {
				$location.path('maps/' + map._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Maps
		$scope.find = function() {
			$scope.maps = Maps.query();
		};

		// Find existing Map
		$scope.findOne = function() {
			$scope.map = Maps.get({ 
				mapId: $stateParams.mapId
			});
		};
	}
]);
'use strict';

//Maps service used to communicate Maps REST endpoints
angular.module('maps').factory('Maps', ['$resource',
	function($resource) {
		return $resource('maps/:mapId', { mapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
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
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
                $location.path('/main');
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				//$location.path('/password/reset/success');


			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		//// Remove a user social account
		//$scope.removeUserSocialAccount = function(provider) {
		//	$scope.success = $scope.error = null;
        //
		//	$http.delete('/users/accounts', {
		//		params: {
		//			provider: provider
		//		}
		//	}).success(function(response) {
		//		// If successful show success message and clear form
		//		$scope.success = true;
		//		$scope.user = Authentication.user = response;
		//	}).error(function(response) {
		//		$scope.error = response.message;
		//	});
		//};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
                    $location.path('/main');
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;

			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);