var featureTypes = {
  "Polygon": require('./feature_types/polygon'),
  "LineString": require('./feature_types/line_string'),
  "Point": require('./feature_types/point')
}

var hat = require('hat');

var Store = module.exports = function(ctx) {
  this.ctx = ctx;
  this.features = {};
}

Store.prototype.render = function() {};

Store.prototype.add = function(geojson, options) {
  geojson.id = geojson.id || hat();
  var model = featureTypes[geojson.geometry.type];

  if(model === undefined) {
    throw new Error('Invalid feature type. Must be Point, Polygon or LineString');
  }

  var feature = new model(this.ctx, geojson);
  this.features[geojson.id] = feature;
  return geojson.id;
}

Store.prototype.get = function(id) {
  return this.features[id];
}

Store.prototype.getAll = function() {
  return Object.keys(this.features).map(id => this.features[id]);
}

Store.prototype.delete = function (id) {
  var feature = this.get(id);
  if (feature) {
    delete this.features[id];
    this.render();
  }
}
