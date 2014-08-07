describe('calendarApp', function(){

	var scope,
		element,
		compiled,
		html,
		ctrl;

	beforeEach(module('calendarDemoApp'));

	beforeEach(module('calendar-app.html'));

	beforeEach(inject(function($rootScope, $compile){

		html="";

		html += "<calendar-app></calendar-app>";

		scope = $rootScope.$new();

		compiled = $compile(html);

		element = compiled(scope);

		scope.$digest();

	}));

	it('should correctly attach the directive controller', function() {

		ctrl = element.data('$calendarAppController');

		expect(angular.isFunction(ctrl.setMonthlyRange)).toBe(true);

		ctrl.setMonthlyRange( new Date(2014,1) );

		expect( element.find('p').length ).toBeTruthy();

	});

	it('should load the calendarNav directive', function() {

		var initialDate = new Date();

		expect( element.find('option').text() ).toContain('January');

		expect( element.find('.months').text() ).toContain('January');

		expect( element.find('option').text() ).toContain(initialDate.getFullYear());

		expect( element.find('.years').text() ).toContain(initialDate.getFullYear());

	});

	it('should have its monthly range set by the calendarNav', function() {

		ctrl = element.data('$calendarAppController');

		debugger;

		spyOn(ctrl,'setMonthlyRange');

		var yearVal = 0;

		element.find('.years').val(yearVal);

		expect(ctrl.setMonthlyRange).toHaveBeenCalledWith(yearVal);

	});

});