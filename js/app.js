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

		$scope.orderByField = 'date';
  		$scope.reverseSort = false;

	    Azureservice.invokeApi('fullinfo', {method: 'get'})
	    .then(function(items) {
	       	$scope.isLoaded = true;
	        $scope.issues = items;
	    }, function(err) {
	        console.error('Azure Error: ' + err);
	    });

	});

	app.controller('MapController', function($scope, $routeParams, Azureservice){
		var lat, lon;
		$scope.name = "MapController";

		if (!jQuery.isEmptyObject($routeParams)) {
	    	Azureservice.getById('Issue', $routeParams.id)
	    	.then(function(item) {
		        console.log('Query successful');
		        $scope.map = {
		        	center: { latitude: item.lat, longitude: item.lon }, 
		        	zoom: 15,
		        	pan: true
		        };
		    }, function(err) {
		        console.error('Azure Error: ' + err);
		    });
	    } else {
	    	$scope.map = {
	    		center: { latitude: 40.101952, longitude: -88.227162 }, 
	    		zoom: 15,
	    		pan: true
	    	};
	    }

	    $scope.marker = {
	    	id: 0
	    };
	});

	app.controller('DetailController', function($scope, $routeParams, Azureservice){
		$scope.name = "DetailController";
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
		.when('/map/:id', {
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
