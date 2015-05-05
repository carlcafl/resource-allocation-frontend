var backendURL = "https://sura-resource-alloc-backend.herokuapp.com/api/rest";

var angularModule = angular.module('resourceAllocationApp', [ 'ngRoute' ])
		.config(function($routeProvider) {
			$routeProvider.
			when('/', {
				templateUrl : '../templates/menu.html'
			}).
			when('/platforms*', {				
				templateUrl : '../templates/menu.html'
			}).
			otherwise({
				redirectTo: '/index.html'			
			});
		});