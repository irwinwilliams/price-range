'use strict';

/* Controllers */

var communityControllers = angular.module('communityControllers', []);
var comService;
var prices;
communityControllers.controller('PriceListCtrl', ['$scope', '$http',
  function($scope, $http) {
      var usefulData = [];
        $http.get('data/tt-supermarkets-2016APR14.json')
            .success(function (data) {
                prices = data;
                var usefulData = [];
                $(prices).each(function(i,k){
                    if (k.name)
                    {
                        usefulData.push(k);
                    }
                });
                $scope.priceData = usefulData;// PriceList.query();
                $scope.gridOptions.data = usefulData;
            });
    $scope.gridOptions = {
    enableSorting: true,
    resizable: true,
    groupable: true,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    columnDefs: [
      { field: 'name', displayName:'Item' },
      { field: 'brand', displayName:'Brand' },
      { field: 'quant', displayName:'Size' },
      { field: 'locations', displayName:'Locations' },
      
    ]
  };
  $scope.gridOptions.data = prices;
    
    $scope.orderProp = 'category';//name
  }]);
  
communityControllers.controller('CommunityListCtrl', ['$scope', 'Community',
  function($scope, Community) {
    comService = Community;
    $scope.communities = Community.query();
    $scope.orderProp = 'category';//name
  }]);

communityControllers.controller('CommunityDetailCtrl', ['$scope', '$routeParams', 'Community',
  function($scope, $routeParams, Community) {
    $scope.phone = Community.get({communityId: $routeParams.communityId}, 
    function(communityId) {
      $scope.mainImageUrl = communityId.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);