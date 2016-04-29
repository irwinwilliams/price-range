'use strict';


var priceRangeApp = angular.module('PriceRangeApp', [
  'ngRoute',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.resizeColumns',
  'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning',
  'nvd3',
  'communityControllers',
  'priceRangeService'
]);

priceRangeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/prices', {
        templateUrl: 'partials/prices.html',
        controller: 'PriceListCtrl'
      }).
      when('/mybasket', {
        templateUrl: 'partials/price-basket.html',
        controller: 'BasketCtrl'
      }).
      when('/getinvolved', {
        templateUrl: 'partials/getinvolved.html',
        controller: 'GetInvolvedCtrl'
      }).
      otherwise({
        redirectTo: '/prices'
      });
  }]);