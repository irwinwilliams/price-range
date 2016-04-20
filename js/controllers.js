'use strict';

/* Controllers */

var communityControllers = angular.module('communityControllers', []);
var comService;
var prices;
communityControllers.controller('PriceListCtrl', ['$scope', '$http', 'uiGridConstants',
  function($scope, $http, $uiGridConstants) {
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
                $scope.locations = $scope.getLocations(usefulData);
                
                 $scope.gridApi.grid.columns[3].filters[0] = {
                    //type: "select",
                    //selectOptions: $scope.getLocations($scope.priceData),
                    condition: $scope.locationSearcher
                };
                $scope.gridApi.grid.refresh()

            });
            
     $scope.locationSearcher = function (searchTerm, cellValue) {
        var lowerTerm = searchTerm.toLowerCase();
        var lowerCell = cellValue;
        var found = false;
        $(cellValue).each(function(idx, key){
            if (found)
             return found;
            $(key.stores).each(function(inX, inKey){
                
                if (inKey.store.name.toLowerCase().indexOf(lowerTerm)>-1)
                {
                    found = true;
                    return found;
                }
            });
        });
        return found;
    }
     
    $scope.getLocations = function(data)
    {
        var loc = [];
        if (data)
        {
            $(data[0].locations).each(function(idx, key){
                loc.push({value:key.location.toLowerCase(), label: key.location});
            });
            //console.log(loc);
        }

        return loc;
    }   
    
    $scope.locationView = function(grid, row)
    {
       // console.log(row);
        var prices = [];
       $(row.entity.locations).each(function(idx, loc)
       {
           $(loc.stores).each(function(innerX, stor)
           {
               prices.push({p: stor.price, n:stor.store.name, l:loc.location});
           });
       });
       var avg = 0;
       var priceCount = 0;
       var lowestStore = 0;
       var lowestPrice = 100000;
       $(prices).each(function(idx, data){
           avg += data.p; 
           if (data.p < lowestPrice)
           {
               lowestPrice = data.p;
               lowestStore = data;
           }
           priceCount++;
       });
       console.log(lowestStore);
       var result = parseFloat(avg/priceCount).toFixed(2);
       var output= "Average: "+result + "; Lowest: "+parseFloat(lowestStore.p).toFixed(2)+" at "+lowestStore.n+" in "+lowestStore.l; 
       var template = "<div style=' word-wrap: break-word'>" + output + "</div>";
       return output;
    }    
    
    $scope.gridOptions = {
    onRegisterApi: function(gridApi){
        $scope.gridApi = gridApi;
    },
    enableSorting: true,
    enableFiltering: true,
    resizable: true,
    groupable: true,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    columnDefs: [
      { field:  'name', displayName:'Item', headerCellClass: $scope.highlightFilteredHeader },
      { field:  'brand', displayName:'Brand', headerCellClass: $scope.highlightFilteredHeader },
      { field:  'quant', displayName:'Size', headerCellClass: $scope.highlightFilteredHeader },
      { field:  'locations', displayName:'Stores', enableFiltering:true,
                headerCellClass: $scope.highlightFilteredHeader,
                filter:{
                    //type: "select",
                    //selectOptions: $scope.getLocations($scope.priceData),
                    condition: $scope.locationSearcher
                },
                cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP">{{grid.appScope.locationView(grid, row)}}</div>'
      },
      
    ]
  };
  $scope.gridOptions.data = prices;
    
    $scope.orderProp = 'category';//name
    $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
        if( col.filters[0].term ){
            return 'header-filtered';
        } else {
            return '';
        }
    };

   
    
    
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