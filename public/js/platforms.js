var platformsApp = angular.module('platformsApp', []);

platformsApp.controller('PlatformListCtrl',['$scope', '$http',
   function ($scope, $http) {
	$http.get(backendURL + '/platforms').success(function(data) {
		$scope.platforms = data;
	});
}]);
