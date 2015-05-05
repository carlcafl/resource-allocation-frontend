var backendURL = "https://sura-resource-alloc-backend.herokuapp.com/api/rest";

var angularModule = angular.module('resourceAllocationApp', [ 'ngRoute' ])
		.config(function($routeProvider) {
			$routeProvider.
			when('/#', {
				templateUrl : '../templates/menu.html'
			}).
			when('/Home', {
				templateUrl : '../templates/menu.html'
			}).
			when('/Platforms', {
				templateUrl : '../platforms/list.html',
				controller : 'PlatformListCtrl'
			}).
			when('/Projects', {
				templateUrl : '../projects/list.html',
				controller : 'ProjectListCtrl'
			}).
			otherwise({
				redirectTo: '/Home'			
			});
		});

angularModule.controller('PlatformListCtrl',['$scope', '$http',PlatformsController]);

function PlatformsController($scope, $http) {
	$http.get(backendURL + '/platforms'
	).success(function(data) {			
		$scope.platforms = data;
	});
};

angularModule.controller('ProjectListCtrl',['$scope', '$http',ProjectsController]);

function ProjectsController($scope, $http) {
	$http.get(backendURL + '/projects'
	).success(function(data) {			
		$scope.projects = data;
	});
};

