angularModule.controller('PlatformListCtrl',['$scope', '$http',PlatformsController]);

function PlatformsController($scope, $http) {
	$http.get(backendURL + '/platforms').success(function(data) {
		$scope.platforms = data;
	});
};

