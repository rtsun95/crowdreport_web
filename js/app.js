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
		$scope.orderByField = 'createtime';
		$scope.reverseSort = true;

		Azureservice.query('Issue', {})
    .then(function(items) {
        $scope.isLoaded = true;
        $scope.issues = items;
        console.log(items);

    }, function(err) {
        console.error('There was an error querying Azure ' + err);
    });
	});

	app.controller('MapController', function($scope, $routeParams, Azureservice){
		$scope.name = "MapController";
		var geocoder = new google.maps.Geocoder();		
		Azureservice.query('Issue', $routeParams.id)
    	.then(function(items) {
	        $scope.issue = items;
			$scope.map = {
				center: { latitude: 40.101952, longitude: -88.227162 }, 
				zoom: 13,
				pan: true
			};
			var buildMarker = function(item, idKey){
				var ret = {
					id: idKey+10,
					latitude: item.lat, 
					longitude: item.lon
				};
      			return ret;
			};
			$scope.markers = []
			var constructMarkers = []
			for(var i = 0 ; i < items.length ; i++){
				constructMarkers.push(buildMarker(items[i], i))
			}
			$scope.markers = constructMarkers;
			console.log($scope.markers);
		},function(err) {
	        console.error('Azure Error: ' + err);
	    });
	});

	app.controller('DetailController', function($scope, $route, $routeParams, Azureservice){
		$scope.name = "DetailController";

		var geocoder = new google.maps.Geocoder();
		Azureservice.getById('Issue', $routeParams.id)
    	.then(function(item) {
        $scope.issue = item;
        $scope.map = {
        	center: { latitude: item.lat, longitude: item.lon }, 
        	zoom: 15,
        	pan: true,
        };
        $scope.marker = {
	    		id: 1,
	    		center: { latitude: item.lat, longitude: item.lon }
	    	};
	    	geocoder.geocode({'latLng': new google.maps.LatLng(item.lat, item.lon)}, function(results, status) {
		    	if (status == google.maps.GeocoderStatus.OK) {
		    		$scope.issue.address = results[0].formatted_address;
			    } else {
			      alert("Geocoder failed due to: " + status);
			    }
		    });
	    }, function(err) {
	        console.error('Azure Error: ' + err);
	  });

    $scope.acknowledge = function() {
    	Azureservice.update('Issue', {
	        id: $routeParams.id,
	        status: 2
	    })
	    .then(function() {
	        console.log('Update successful');
	        $route.reload()
	    }, function(err) {
	        console.error('Azure Error: ' + err);
	    });
    }

    $scope.reject = function() {
    	Azureservice.update('Issue', {
	        id: $routeParams.id,
	        status: 1
	    })
	    .then(function() {
	        console.log('Update successful');
	        $route.reload()
	    }, function(err) {
	        console.error('Azure Error: ' + err);
	    });
    }
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
