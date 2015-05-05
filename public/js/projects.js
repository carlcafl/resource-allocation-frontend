angularModule.controller('ProjectListCtrl',['$scope', '$http',ProjectsController]);

function ProjectsController($scope, $http) {
	$http.get(backendURL + '/platforms').success(function(data) {
		$scope.platforms = data;
		alert('success!');
	});
};
