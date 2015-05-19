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
			when('/NewPlatform', {
				templateUrl : '../platforms/new_or_edit.html',
				controller : 'NewPlatformCtrl'
			}).
			when('/EditPlatform/:id', {
				templateUrl : '../platforms/new_or_edit.html',
				controller : 'NewPlatformCtrl'
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
	
	$scope.gotoDetail = function() {
		waitingDialog.show('Cargando...');
		location.href="#EditPlatform/" + this.platform.id;
	};
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

angularModule.controller('NewPlatformCtrl',['$scope', '$http', '$routeParams', NewPlatformController]);

function NewPlatformController($scope, $http, $routeParams) {

	$scope.option = 'Nueva';
	var id = ($routeParams.id || "");
	if (id!="") {
		$scope.option = 'Editar';
		waitingDialog.show('Cargando...');
		$http.get(backendURL + '/platforms/' + id
		).success(function(data) {			
			$scope.platform = data;
			$scope.platformId = $scope.platform.id;
			$scope.shortName = $scope.platform.shortName;
			$scope.name = $scope.platform.name;
			$scope.department = $scope.platform.department;
			$scope.owner = $scope.platform.owner;
			$scope.ownerEmail = $scope.platform.ownerEmail;
		});
		$http.get(backendURL + '/platforms/' + id + '/capacity'
		).success(function(data) {			
			$scope.capacity = data;
			waitingDialog.hide();
		});
	}

	

	$scope.create = function() {
		$scope.submitted = true;
		if ($scope.platformId == undefined) {
			waitingDialog.show('Cargando...');
			var platformJson = {
					  shortName: $scope.shortName,
					  name: $scope.name,
					  department: $scope.department,
					  owner: $scope.owner,
					  ownerEmail: $scope.ownerEmail
					};
			var res = $http.post(backendURL + '/platforms',platformJson);
			res.success(function(data, status, headers, config) {			
					$scope.shortName = '';
					$scope.name = '';
					$scope.department = '';
					$scope.owner = '';
					$scope.ownerEmail = '';
					$scope.submitted = false;
					showAlert('#successMessage');
					waitingDialog.hide();
			});
			res.error(function(data, status, headers, config) {			
				showAlert('#errorMessage');
				waitingDialog.hide();
			});
		} else {
			waitingDialog.show('Cargando...');
			var platformJson = {
					  shortName: $scope.shortName,
					  name: $scope.name,
					  department: $scope.department,
					  owner: $scope.owner,
					  ownerEmail: $scope.ownerEmail
					};
			var res = $http.put(backendURL + '/platforms/' + $scope.platformId,platformJson);
			res.success(function(data, status, headers, config) {			
//					$scope.shortName = '';
//					$scope.name = '';
//					$scope.department = '';
//					$scope.owner = '';
//					$scope.ownerEmail = '';
					$scope.submitted = false;
					showAlert('#successMessage');
					waitingDialog.hide();
			});
			res.error(function(data, status, headers, config) {			
				showAlert('#errorMessage');
				alert(status);
				waitingDialog.hide();
			});
		}
	};
}

function showAlert(alertId) {
	$(alertId).show();
	window.setTimeout(function() {$(alertId).hide();}, 2000);
}

