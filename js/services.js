'use strict';

/* Services */

var priceRangeService = angular.module('priceRangeService', ['ngResource']);

priceRangeService.factory('priceRangeService', ['$http',
    function ($http) {
        var data = [];
        var basket = [];
       
        return {
            async: function () {
                return $http.get('data/tt-supermarkets-2016APR14.json');
            },
            parse: function (prices) {
                data = [];
                var that = this;
                $(prices).each(function (i, k) {
                    if (k.name) {
                        var len = data.push(k);
                        data[len - 1].getPrices = that.getPrices;

                        data[len - 1].spark = {
                            options: {
                                chart: {
                                    type: 'multiBarChart',
                                    height: 20,
                                    width: 300,
                                    //x: function(xd, i) { return i; },
                                    "x": "Store",
                                    "y": "Price",
                                    "Group": "Location"
                                }
                            },
                            data: that.getPrices(k)
                        };
                    }//endif
                }//endeachfn
                );//endeach
                return data;
            },//endparse
            getBasket: function()
            {
                return basket;
            },
            modifyBasket: function (toAdd, item) {
                if (toAdd)
                {
                    basket.push(item);
                }
                else 
                {
                    basket = $.grep(data, function(e){ 
                    return item.uid != e.uid; 
                    });
                }
            },
            getPrices: function (itemData) {
                var result = [];
                var i = 1;
                $(itemData.locations).each(function (idx, key) {

                    $(key.stores).each(function (innX, inKey) {
                        i += 1;
                        //result.push({y:inKey.price, x:i/*inKey.store.name*/, l:inKey.store.location});
                        result.push({ "Price": inKey.price, "Freq": inKey.price, "Store": inKey.store.name, "Location": inKey.store.location });
                    });
                });
                return (result);
            },
            sortPrices: function(prices)
            {
                 function compare (a,b) {
                    if (a.price < b.price)
                        return -1;
                    else if (a.price > b.price)
                        return 1;
                    else 
                        return 0;
                };
                var sorted = prices.sort(   compare);
                return sorted;
            },
            getLocations: function () {
                var loc = [];
                if (data) {
                    $(data[0].locations).each(function (idx, key) {
                        loc.push({ value: key.location.toLowerCase(), label: key.location });
                    });
                }

                return loc;
            }
        }
    }]);

/*priceRangeServices.factory('PriceRange', ['$resource',
  function($resource){
    return $resource('data/tt-supermarkets-2016APR14.json', {}, 
    {
        query: {method:'GET', params:{communityId:'communities'}, isArray:true}    });
  }]);*/