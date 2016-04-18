'use strict';

/* Services */

var communityServices = angular.module('communityServices', ['ngResource']);

communityServices.factory('Community', ['$resource',
  function($resource){
    return $resource('data/communities.json', {}, 
    {
      query: {method:'GET', params:{communityId:'communities'}, isArray:true}
    });
  }]);
  
  
  communityServices.factory('PriceList', ['$resource',
  function($resource){
    return $resource('data/tt-supermarkets-2016APR14.json', {}, 
    {
      query: {method:'GET', params:{communityId:'communities'}, isArray:true}
    });
  }]);