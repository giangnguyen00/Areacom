'use strict';

angular.module('maps').directive('maps', [
    function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/maps/views/maps.template.client.view.html',
            scope: {
                selected: '=',
                contracts: '='
            },
            link: function (scope) {

/*
                scope.hasContract = function(day) {
                    var lat = 0;
                    var longit = 0;
                    var result = false;
                    angular.forEach(scope.contracts ,function(value, index){
                     var lat2 = 0;
                     var longit2 = 0;
                       // if(lat == lat2 && longit = longit2)
                        {
                            result = true;
                        }
                    });
                    return result;
                };
                */

            }
        };

    }
]);