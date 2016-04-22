'use strict';

/* Controllers */

var communityControllers = angular.module('communityControllers', []);
var comService;
var prices;
communityControllers.controller('PriceListCtrl', ['$scope', '$http', 'uiGridConstants',
  function($scope, $http, $uiGridConstants) {
      var usefulData = [];
      
      $scope.getPrices = function(data)
      {
          var result = [];
          var i=1;
          $(data.locations).each(function(idx, key){
              
              $(key.stores).each(function(innX, inKey){
                  i+=1;
                  //result.push({y:inKey.price, x:i/*inKey.store.name*/, l:inKey.store.location});
                  result.push({"Price":inKey.price, "Freq":inKey.price, "Store":inKey.store.name, "Location":inKey.store.location});
              });
          });
          return(result);  
      };
      
        $http.get('data/tt-supermarkets-2016APR14.json')
            .success(function (data) {
                prices = data;
                var usefulData = [];
                $(prices).each(function(i,k){
                    if (k.name)
                    {
                        var len = usefulData.push(k);
                        usefulData[len-1].getPrices = $scope.getPrices;
                        
                        usefulData[len-1].spark = {
                            options: {
                                chart: {
                                type: 'multiBarChart',
                                height: 20,
                                width: 300,
                                //x: function(xd, i) { return i; },
                                "x": "Store",
                                "y": "Price",
                                "Group":"Location"
                                }
                            },
                            data: $scope.getPrices(k)
                        };
                        
                        
                        
         
                        
                       
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
        var display = $scope.locationView(cellValue);
        var found = display.toLowerCase().indexOf(lowerTerm) > -1;
        /*
        var lowerCell = cellValue;
        var found = false;
        $(cellValue).each(function(idx, key){
            if (found)
             return found;
            $(key.stores).each(function(inX, inKey){
                if (inKey.store.name.toLowerCase().indexOf(lowerTerm)>-1
                || inKey.store.location.toLowerCase().indexOf(lowerTerm)>-1)
                {
                    found = true;
                    return found;
                }
            });
        });*/
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
        }

        return loc;
    }   
    
    $scope.locationView = function(locations)
    {
        var prices = [];
       $(locations).each(function(idx, loc)
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
           if (!(data.p)) {
               
           }
           else{
            avg += data.p; 
            if (data.p < lowestPrice)
            {
                lowestPrice = data.p;
                lowestStore = data;
            }
            priceCount++;
           }
       });
       avg = parseFloat(avg/priceCount).toFixed(2);
       
       var result = "$"+avg.toString();
       var output= "Avg: "+result + "; Best: $"+parseFloat(lowestStore.p).toFixed(2)+" at "+lowestStore.n+" in "+lowestStore.l; 
       
       return output;
    }    
    
    $scope.gridOptions = getGridOptions($scope);
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