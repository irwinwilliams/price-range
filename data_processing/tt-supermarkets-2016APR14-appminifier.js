var compressor = require('node-minify');
 
// Using Google Closure 
new compressor.minify({
  type: 'gcc',
  fileIn: 'tt-supermarkets-2016APR14.json',
  fileOut: 'tt-supermarkets-2016APR14-minified.json',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});