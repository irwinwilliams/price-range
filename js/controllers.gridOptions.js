var getGridOptions = function($scope) {
    return {
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
      { field:  'name', displayName:'Item', width:"*", maxWidth: 9000, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'brand', displayName:'Brand', maxWidth: 90, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'quant', displayName:'Size', maxWidth: 90, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'locations', displayName:'Stores', enableFiltering:true,
                headerCellClass: $scope.highlightFilteredHeader,
                filter:{
                    //type: "select",
                    //selectOptions: $scope.getLocations($scope.priceData),
                    condition: $scope.locationSearcher
                },
                
                enableFiltering: false ,
                cellTemplate: '<div class="ui-grid-cell-contents" style="word-wrap: break-word">{{grid.appScope.locationView(grid, row)}}</div>'
      },
      { field: 'getPrices()', enableFiltering: false ,
      displayName: 'Prices', cellTemplate: "partials/prices-chart.html" }
      
    ]
}};