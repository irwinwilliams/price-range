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
      { field:  'name', displayName:'Item', width:"260", maxWidth: 300, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'brand', displayName:'Brand', maxWidth: 90, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'quant', displayName:'Size', maxWidth: 90, headerCellClass: $scope.highlightFilteredHeader },
      { field:  'locations', displayName:'Stores',  maxWidth:9000,
                headerCellClass: $scope.highlightFilteredHeader,
                filter:{
                    //type: "select",
                    //selectOptions: $scope.getLocations($scope.priceData),
                    condition: $scope.locationSearcher
                },
                
                enableFiltering: true ,
                cellTemplate: "partials/prices-chart.html"
      },
      //{ field: 'getPrices()', enableFiltering: false ,
      //displayName: 'Prices', cellTemplate: "partials/prices-chart.html" }
      
    ]
}};