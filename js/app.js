'use strict';


var priceRangeApp = angular.module('PriceRangeApp', [
  'ngRoute',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.resizeColumns',
  'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning',
  'nvd3',
  'communityControllers',
  'communityServices'
]);

priceRangeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/prices', {
        templateUrl: 'partials/prices.html',
        controller: 'PriceListCtrl'
      }).
      when('/community/:communityId', {
        templateUrl: 'partials/community.html',
        controller: 'CommunityDetailCtrl'
      }).
      when('/getinvolved', {
        templateUrl: 'partials/getinvolved.html',
        controller: 'GetInvolvedCtrl'
      }).
      otherwise({
        redirectTo: '/prices'
      });
  }]);
  
  /*{"tt-tech": {
  "communities": [
    {
     "Phones": "",	
      "Twitter": "",	
      "Facebook": "",	
      "Web": "",
      "Instagram": "",
      "Name": "",
      "Areas": [""],
      "Country": "",
      "Town": "",
      "Email": "",
      "AdministratorContact":""
    },
    {
     "Phones": "",	
      "Twitter": "",	
      "Facebook": "",	
      "Web": "",
      "Instagram": "",
      "Name": "",
      "Areas": [""],
      "Country": "",
      "Town": "",
      "Email": "",
      "AdministratorContact":""
    },
    {
     "Phones": "",	
      "Twitter": "",	
      "Facebook": "",	
      "Web": "",
      "Instagram": "",
      "Name": "",
      "Areas": [""],
      "Country": "",
      "Town": "",
      "Email": "",
      "AdministratorContact":""
  }]}}
  */