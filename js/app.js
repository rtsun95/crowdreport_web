(function(){

	var app = angular.module('crowdReport', []);

	app.controller('CrowdReportController', function($scope){
		$scope.products = gems;
	});

	app.controller('sidebarController', function($scope, $location) {
		$scope.isActive = function(viewLocation) {
			return viewLocation === $location.path();
		}
		// $scope.review = {};

		// $scope.addReview = function(product) {
		// 	product.reviews.push($scope.review);
		// 	$scope.review = {};
		// };
	});

	app.controller('PanelController', function($scope){
		$scope.tab = 1;

		$scope.selectTab = function(setTab) {
			$scope.tab = setTab;
		}
		$scope.isSelected = function(checkTab) {
			return $scope.tab === checkTab;
		}
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
