var projectsApp = angular.module('projectsApp', []);

projectsApp.controller('ProjectListCtrl',['$scope', '$http',
   function ($scope, $http) {
	$http.get(backendURL + '/projects').success(function(data) {
		$scope.projects = data;
	});
}]);
