(function(){

	var app = angular.module('crowdReport', ['ngRoute']);

	app.controller('CrowdReportController', function($scope, $route, $routeParams, $location){
		$scope.products = gems;

		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		}

		$scope.$route = $route;
     	$scope.$location = $location;
     	$scope.$routeParams = $routeParams;
	});

	app.controller('OverviewController', function($scope, $routeParams){
		$scope.name = "OverviewController";
    	$scope.params = $routeParams;
	});


	app.controller('CategoryController', function($scope, $routeParams, $route){
		$scope.name = "CategoryController";
    	$scope.params = $routeParams;
    	$scope.issues = gems;
    	$scope.reloadRoute = function() {
		   $route.reload();
		}
	});


	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/category', {
			templateUrl: '/category.html',
			controller: 'CategoryController'
		})
		.when('/', {
			templateUrl: '/dashboard.html',
			controller: 'OverviewController'
		})
		.otherwise({
            redirectTo: '/'
        });;

		//$locationProvider.html5Mode(true);
	});
	

	var gems = [
	{
		name: 'Dodecahedron',
		price: 2,
		description: 'Hey man',
		canPurchase: true,
		isSoldOut: false,
		reviews: [
			{
				stars: 5,
				body: "I love this product!",
				author: "joe@thomas.com"	
			},
			{
				stars: 1,
				body: "I hate it",
				author: "haha@mailinator.com"	
			}
		]
	},
	{
		name: 'Pentagonal Gem',
		price: 5.95,
		description: 'Hey girl',
		canPurchase: true,
		isSoldOut: false,
		reviews: [
			{
				stars: 4,
				body: "I love this product!",
				author: "janet@thomas.com"	
			},
			{
				stars: 3,
				body: "I hate it",
				author: "yolo@mailinator.com"	
			}
		]
	},
	{
		name: 'Random Gem',
		price: 3.21,
		description: 'Hey everyone',
		canPurchase: true,
		isSoldOut: false,
		reviews: [
			{
				stars: 3,
				body: "I love this product!",
				author: "blah@thomas.com"	
			},
			{
				stars: 2,
				body: "I hate it",
				author: "brag@mailinator.com"	
			}
		]
	}
	];

})();
