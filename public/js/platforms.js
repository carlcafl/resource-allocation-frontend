var backendURL = "https://sura-resource-alloc-backend.herokuapp.com/api/rest";

var resourceAllocationApp = angular.module('resourceAllocationApp', []);

resourceAllocationApp.controller('PlatformListCtrl',['$scope', '$http',
   function ($scope, $http) {
	$http.get(backendURL + '/platforms').success(function(data) {
		$scope.platforms = data;
	});
}]);
