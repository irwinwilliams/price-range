"use strict";

var grocItems = require('./GroceryItem');
var xlsx = require('node-xlsx');
var path = require('path');
var util = require('util');


var scriptName = path.basename(__filename).replace("js", "xlsx");

scriptName = process.argv[2];

var workbook = xlsx.parse(__dirname + '/'+ scriptName); // parses a file

var section1 = workbook[0];

var locations = [];
var stores = [];
//get indexes of locations
for (var iLoc in section1.data[0])
{
    var loc = {name: section1.data[0][iLoc], index: iLoc};
    locations.push( loc)
}

for (var iStor in section1.data[1])
{
    if (iStor < 5) continue;
    var iStorLoc = iStor;
    
    while (!(section1.data[0][iStorLoc])) iStorLoc--;
    
    var locationName = section1.data[0][iStorLoc];
    var stor =  {name: section1.data[1][iStor], index: iStor, location: locationName};
    stores[iStor] = stor;
}

//console.log(stores);

var groceryItems = [];
for (var dataItem = 2; dataItem < section1.data.length; dataItem++) 
{
    var groc = new grocItems.GroceryItem(
        section1.data[dataItem][0], 
        section1.data[dataItem][1],
        section1.data[dataItem][3], []
    );
    
    groceryItems.push(groc);
}

for (var idx = 2; idx < section1.data.length; idx++) 
{
    var item = groceryItems[idx-2];
                
    stores.forEach(function(sto) {
        var storeIdx = sto.index;
        if (section1.data[idx])
        {
            var storprice = section1.data[idx][storeIdx];
            if (!Number.isNaN(storprice) && storprice !== "-")
            {
                var locationIdx = item.locations.reduce( function( cur, val, index ){

                    if( val.location === sto.location && cur === -1 ) {
                        return index;
                    }
                    return cur;
                }, -1 );

                var priceAndStore = {price: storprice, store: sto};

                if (locationIdx === -1)
                {
                    var locStores = {location: sto.location, stores:[]};
                    locationIdx = item.locations.push(locStores)-1;
                }
                item.locations[locationIdx].stores.push(priceAndStore); 
            }
        }
    });
    
    
    
}
//console.log(groceryItems[2].locations);
//console.log(util.inspect(groceryItems, false, null));

var output = JSON.stringify(groceryItems, null, '\t');
console.log(output);
