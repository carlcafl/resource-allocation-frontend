var backendURL = "https://sura-resource-alloc-backend.herokuapp.com/api/rest";

var angularModule = angular.module('resourceAllocationApp', [ 'ngRoute', 'ngTable' ])
		.config(function($routeProvider) {
			$routeProvider.
			when('/', {
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
			when('/About', {
				templateUrl : '../about.html'
			}).
			otherwise({
				redirectTo: '/Home'			
			});
		});

angularModule.controller('PlatformListCtrl',function($scope, $http, $filter, ngTableParams) {
	waitingDialog.show('Cargando...');
	$http.get(backendURL + '/platforms'
	).success(function(data) {			
		$scope.platforms = data;
		$scope.platformsTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        sorting: {
	            shortName: 'asc'     // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var orderedData = params.sorting() ?
	                                $filter('orderBy')(data, params.orderBy()) :
	                                	data;

	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });
		waitingDialog.hide();
	});
	
});

angularModule.controller('ProjectListCtrl',function ProjectsController($scope, $http, $filter, ngTableParams) {
	waitingDialog.show('Cargando...');
	$http.get(backendURL + '/projects'
	).success(function(data) {			
		$scope.projects = data;
		$scope.projectsTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var orderedData = params.sorting() ?
	                                $filter('orderBy')(data, params.orderBy()) :
	                                	data;

	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });
		waitingDialog.hide();
	});
});

