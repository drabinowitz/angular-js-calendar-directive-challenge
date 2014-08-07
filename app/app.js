angular.module('calendarDemoApp', []).

factory('calendarRange',function(){

	return {

	  DAY : 24 * 60 * 60 * 1000,

	  prepareDate : function(date) {
	    date = new Date(date);
	    var day = date.getDay();
	    return {
	      date : date,
	      weekday : day != 0 && day != 6,
	      day : date.getDate(),
	      month : date.getMonth(),
	      year : date.getFullYear()
	    }
	  },

	  getMonthlyRange : function(date) {
	    var month = date.getMonth();
	    var startDay = new Date(date);
	    startDay.setDate(1);

	    var firstDay = new Date(startDay);
	    if (firstDay.getDay() > 0) { //Not Sunday
	      firstDay.setTime(firstDay.getTime() - (firstDay.getDay() * this.DAY));
	    }

	    var endDay = new Date(startDay);
	    if(month == 11) {
	      endDay.setMonth(0);
	      endDay.setYear(endDay.getFullYear() + 1);
	    } else {
	      endDay.setMonth(month + 1);
	    }

	    endDay.setTime(endDay.getTime() - this.DAY);

	    var lastDay = new Date(endDay);
	    lastDay.setTime(lastDay.getTime() + (6 - endDay.getDay()) * this.DAY);

	    var date = new Date(firstDay);
	    var days = [];
	    while(date <= lastDay) {
	      days.push(this.prepareDate(date));
	      date.setTime(date.getTime() + this.DAY);
	    }

	    return {
	      first : firstDay,
	      start : startDay,
	      end : endDay,
	      last : lastDay,
	      days : days
	    };
	  }

	};

}).

controller('calendarCtrl',['$scope','calendarRange',function($scope,calendarRange){

	var monthlyRange = {};

	$scope.days = [];

	$scope.startDay;

	$scope.endDay;

	this.setMonthlyRange = function( date ){

		// $scope.$apply(function(){

		monthlyRange = calendarRange.getMonthlyRange( date );

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