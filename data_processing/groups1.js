var xlsx = require('node-xlsx');
var workbook = xlsx.parse(__dirname + '/groups1.xlsx'); // parses a file
var orgs = workbook[0];
var seedId = 9;
var cols = //orgs.data[0];
[ 'Group Name',
  'Website',
  'Contact Person',
  'Direct Email',
  'Status',
  'Country',
  'Group Target Members/Description',
  'Emailed' ];
 var sampleData = {
        "_id": -1,
        "name": "",
        "logoUrl": "img/tech_community.png",
        "web": "",
        "social": 
            [  ],
        "description": "",
        "categories": []
    }
function makeData(aRow)
{
    var row = JSON.parse(aRow);
    var data = JSON.parse(JSON.stringify(sampleData));
    data._id = seedId++;
    data.name = row[0];
    data.web = row[1];
    data.description = row[6];
    if (data.name)
        return data;
}

var alldata = [];
for (row in orgs.data)
{
    var res = makeData(JSON.stringify(orgs.data[row]));
    if (res)
    {
        alldata.push(res);
    }
}

var output = JSON.stringify(alldata, null, '\t');
console.log(output);
