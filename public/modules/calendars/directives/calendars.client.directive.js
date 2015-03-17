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
                    var result = false;
                    angular.forEach(scope.contracts ,function(value, index){
                    	var date1 = $filter('date')(day.date, "YYYY-MM-DD");
                    	var date2 = $filter('date')(value.startDate, "YYYY-MM-DD");
                    	alert(date1);
                    	alert(date2);
                        if(day.date === value.StartDate) {
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