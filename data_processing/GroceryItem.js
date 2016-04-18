module.exports.GroceryItem = function (name, brand, quant, locations) {
  this.name = name;
  this.brand = brand;
  this.quant = quant;
  this.locations = locations;
}

module.exports.GroceryItem.prototype.toString = function dogToString() {
  var ret = this.name + ' - ' + this.brand + ' - ' + this.quant;
  return ret;
}