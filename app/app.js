angular.module('calendarDemoApp', []).

/*factory('calendarRange',function(){

	return {

	  getMonthlyRange : function(date) {
	    
	  	return CalendarRange.getMonthlyRange(date);

	  }

	};

}).*/

controller('calendarCtrl',['$scope',function($scope){

	var monthlyRange = {};

	$scope.days = [];

	$scope.startDay;

	$scope.endDay;

	this.setMonthlyRange = function( date ){

		// $scope.$apply(function(){

		monthlyRange = CalendarRange.getMonthlyRange( date );

		$scope.days = monthlyRange.days;

		$scope.startDay = monthlyRange.start;

		$scope.endDay = monthlyRange.end;

		// });

	};

}]).

directive('calendarApp',function(){

	return {

		restrict : 'E',

		templateUrl : 'calendar-app.html',

		scope : true,

		controller : 'calendarCtrl'

	};

}).

directive('calendarNav', function(){

	return {

		require : '?^calendarApp',

		restrict : 'A',

		link : function(scope, element, attrs, calendarCtrl) {

			var initialDate = new Date();

			calendarCtrl.setMonthlyRange(initialDate);

			scope.months = [ 'January','February','March','April','May','June','July','August','September','October','November','December' ];

			var years=[];

			for(var i = initialDate.getFullYear() - 20; i < initialDate.getFullYear() + 20; i++){

				years.push(i);

			}

			scope.years = years;

			scope.selectedMonth = scope.months[initialDate.getMonth()];

			scope.selectedYear = initialDate.getFullYear();

			scope.$watch('selectedMonth',function(newValues, oldValues){

				calendarCtrl.setMonthlyRange( new Date( scope.selectedYear, scope.months.indexOf(scope.selectedMonth) ) );

			});

			scope.$watch('selectedYear',function(newValues, oldValues){

				calendarCtrl.setMonthlyRange( new Date( scope.selectedYear, scope.months.indexOf(scope.selectedMonth) ) );

			});

		}

	};

});