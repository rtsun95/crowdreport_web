(function(){

	var app = angular.module('crowdReport', ['ngRoute', 'azure-mobile-service.module', 'uiGmapgoogle-maps']);

	app.constant('AzureMobileServiceClient', {
	    API_URL : 'https://crowdreport.azure-mobile.net/',
	    API_KEY : 'IAXYIWkvtVOOMlVehoCEDWscGMFqRT58'
	});

	app.controller('CrowdReportController', function($scope, $route, $routeParams, $location){
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		}

		$scope.$route = $route;
     	$scope.$location = $location;
     	$scope.$routeParams = $routeParams;
	});

	app.controller('OverviewController', function($scope, $routeParams){
		$scope.name = "OverviewController";
	});

	app.controller('CategoryController', function($scope, $routeParams, Azureservice){
		$scope.name = "CategoryController";

		$scope.categoryFilter = '';
		$scope.orderByField = 'date';
  		$scope.reverseSort = false;

  		Azureservice.query('Issue', {})
	    .then(function(items) {
	        $scope.isLoaded = true;
	        $scope.issues = items;
	        console.log(items);

	    }, function(err) {
	        console.error('There was an error quering Azure ' + err);
	    });
	});

	app.controller('MapController', function($scope, $routeParams, Azureservice){
		$scope.name = "MapController";

    	$scope.map = {
    		center: { latitude: 40.101952, longitude: -88.227162 }, 
    		zoom: 15,
    		pan: true
    	};
	    $scope.marker = {
	    	id: 0
	    };
	});

	app.controller('DetailController', function($scope, $routeParams, Azureservice){
		$scope.name = "DetailController";

		Azureservice.getById('Issue', $routeParams.id)
    	.then(function(item) {
	        $scope.issue = item;
	        $scope.map = {
	        	center: { latitude: item.lat, longitude: item.lon }, 
	        	zoom: 15,
	        	pan: true
	        };
	        $scope.marker = {
		    	id: 1,
		    	center: { latitude: item.lat, longitude: item.lon }
		    };
	    }, function(err) {
	        console.error('Azure Error: ' + err);
	    });


	});


	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/browse', {
			templateUrl: '/browse.html',
			controller: 'CategoryController'
		})
		.when('/map', {
			templateUrl: '/map.html',
			controller: 'MapController'
		})
		.when('/detail/:id', {
			templateUrl: '/detail.html',
			controller: 'DetailController'
		})
		.when('/', {
			templateUrl: '/overview.html',
			controller: 'OverviewController'
		})
		.otherwise({
            redirectTo: '/'
        });;

	});

})();
