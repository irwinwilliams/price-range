'use strict';

/* Controllers */

var communityControllers = angular.module('communityControllers', []);

communityControllers.controller('PriceListCtrl', 
    ['priceRangeService', '$scope', '$http', 'uiGridConstants', '$timeout', 'localStorageService',
    function (priceRangeService, $scope, $http, $uiGridConstants, $timeout, localStorageService) {
        var usefulData = [];
        var currentBasket = [];

        $scope.saveState = function() {
            var state = $scope.gridApi.saveState.save();
            localStorageService.set('gridState', state);
        };

        $scope.restoreState = function () {
            $timeout(function() {
                var state = localStorageService.get('gridState');
                if (state) $scope.gridApi.saveState.restore($scope, state);
            });
        };

        priceRangeService.async().then(function (result) {
            var data = result.data;
            usefulData = priceRangeService.parse(data);
            $scope.priceData = usefulData;
            $scope.gridOptions.data = usefulData;
            $scope.locations = priceRangeService.getLocations();

            $scope.gridApi.grid.columns[3].filters[0] = {
                condition: $scope.locationSearcher
            };
            $scope.gridApi.grid.refresh();

        }).then(function () {
            currentBasket = priceRangeService.getBasket();
            $scope.gridApi.selection.clearSelectedRows();
            $(currentBasket).each(function (idx, key) {
                //$scope.gridApi.selection.toggleRowSelection($scope.gridOptions.data[key.index]);
                //console.log($scope);                
                //console.log(key);                
            });
            //console.log($scope);
            //$scope.gridApi.grid.refresh();
            //console.log($scope.gridApi.selection);
            //console.log($scope);
        }).then(function(){
            // Restore previously saved state.
            $scope.restoreState();
        }).catch(console.log.bind(console));

        $scope.rowSelectionChanged = function (row, event) {
            //console.log(row.entity.getPrices(row.entity));
            row.entity.index = $scope.gridOptions.data.indexOf(row.entity);
            row.entity.source = row;
            priceRangeService.modifyBasket(row.isSelected, row.entity);
            
            $scope.saveState();
        };

        $scope.rowSelectionChangedBatch = function (rows) {
            $(rows).each(function (i, row) { $scope.rowSelectionChanged(row) });
        };

        $scope.locationSearcher = function (searchTerm, cellValue) {
            var lowerTerm = searchTerm.toLowerCase();
            var result =  $scope.locationView(cellValue.entity, cellValue);
            var display = result.display;
            cellValue.entity.lowest = result.lowestStore;
            var found = display.toLowerCase().indexOf(lowerTerm) > -1;
            return found;
        }


        $scope.locationView = function (entity, locations) {
            var prices = [];
            $(locations).each(function (idx, loc) {
                $(loc.stores).each(function (innerX, stor) {
                    prices.push({ p: stor.price, n: stor.store.name, l: loc.location });
                });
            });
            var avg = 0;
            var priceCount = 0;
            var lowestStore = 0;
            var lowestPrice = 100000;
            $(prices).each(function (idx, data) {
                if (!(data.p)) {

                }
                else {
                    avg += data.p;
                    if (data.p < lowestPrice) {
                        lowestPrice = data.p;
                        lowestStore = data;
                    }
                    priceCount++;
                }
            });
            avg = parseFloat(avg / priceCount).toFixed(2);

            var result = "$" + avg.toString();
            var output = "Avg: " + result + "; Best: $" + parseFloat(lowestStore.p).toFixed(2) + " at " + lowestStore.n + " in " + lowestStore.l;
            if (entity)
            {
                entity.lowest = lowestStore;
            }
            return {display:output, lowest: lowestStore};
        }

        $scope.getSubGridData = function (entity) {
            var priceStoreLocations = [];
            $(entity.locations).each(function (idx, key) {
                $(key.stores).each(function (innX, inKey) {
                    var psl = { Price: inKey.price, Store: inKey.store.name, Location: key.location };
                    priceStoreLocations.push(psl);
                });
            });
            return priceStoreLocations;
        };

        $scope.gridOptions = getGridOptions($scope);
        $scope.gridOptions.data = usefulData;

        $scope.orderProp = 'category';//name
        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };




    }]);


communityControllers.controller('BasketCtrl', ['priceRangeService', '$scope',
    function (priceRangeService, $scope, $http, $uiGridConstants) {
        $scope.basket = priceRangeService.getBasket();
        $scope.getRecommendation = function (prices) {
            var sorted = priceRangeService.sortPrices(prices);
            return prices[0];
        }
    }]);

communityControllers.controller('CommunityListCtrl', ['$scope', 'Community',
    function ($scope, Community) {
        comService = Community;
        $scope.communities = Community.query();
        $scope.orderProp = 'category';//name
    }]);

communityControllers.controller('CommunityDetailCtrl', ['$scope', '$routeParams', 'Community',
    function ($scope, $routeParams, Community) {
        $scope.phone = Community.get({ communityId: $routeParams.communityId },
            function (communityId) {
                $scope.mainImageUrl = communityId.images[0];
            });

        $scope.setImage = function (imageUrl) {
            $scope.mainImageUrl = imageUrl;
        };
    }]);