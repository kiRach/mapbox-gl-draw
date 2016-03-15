var hat = require('hat');

var featureTypes = {
  "Polygon": require('./feature_types/polygon'),
  "LineString": require('./feature_types/line_string'),
  "Point": require('./feature_types/point')
}

var typeMap = {
  'point': 'Point',
  'line': 'LineString',
  'polygon': 'Polygon'
}

var API = module.exports = function(ctx) {
  this.ctx = ctx;
}

API.prototype.add = function (geojson, opts) {
  var geojson = JSON.parse(JSON.stringify(geojson));
  if (geojson.type === 'FeatureCollection') {
    return geojson.features.map(feature => this.add(feature, options));
  }

  if (!geojson.geometry) {
    geojson = {
      type: 'Feature',
      id: geojson.id,
      properties: geojson.properties || {},
      geometry: geojson
    };
  }

  geojson.id = geojson.id || hat();
  var model = featureTypes[geojson.geometry.type];

  if(model === undefined) {
    throw new Error('Invalid feature type. Must be Point, Polygon or LineString');
  }

  var feature = new model(this.ctx, geojson);
  return this.ctx.store.add(feature);
}

API.prototype.get = function (id) {
  var feature = this.ctx.store.get(id);
  if (feature) {
    return feature.toGeoJSON();
  }
}

API.prototype.getAll = function() {
  return {
    type: 'FeatureCollection',
    features: this.ctx.store.getAll().map(feature => feature.toGeoJSON())
  }
}

API.prototype.getSelected = function() {
  return {
    type: 'FeatureCollection',
    features: this.ctx.store.getAll()
    .filter(feature => feature.isSelected())
    .map(feature => feature.toGeoJSON())
  }
}

API.prototype.select = function (id) {
var feature = this.ctx.store.get(id);
  if (feature) {
    feature.select();
  }
}

API.prototype.selectAll = function () {
  this.ctx.store.getAll().forEach(feature => feature.select());
}

API.prototype.unselect = function (id) {
  var feature = this.ctx.store.get(id);
  if (feature) {
    feature.unselect();
  }
}

API.prototype.unselectAll = function () {
  this.ctx.store.getAll().forEach(feature => feature.unselect());
}

API.prototype.update = function(id, geojson) {
  var feature = this.ctx.store.get(id);
  if (feature) {
    feature.update(JSON.parse(JSON.stringify(geojson)));
  }
}

API.prototype.delete = function(id) {
  this.ctx.store.delete(id);
}

API.prototype.deleteAll = function() {
  this.ctx.store.getAll().forEach(feature => this.ctx.store.delete(feature.id));
}

API.prototype.deleteSelected = function() {
  this.ctx.store.getAll().forEach(feature => {
    if (feature.isSelected() ) {
      this.ctx.store.delete(feature.id);
    }
    else if (feature.deleteSelectedCoords) {
      feature.deleteSelectedCoords();
    }
  });
}

API.prototype.startDrawing = function (type) {
  console.log('startDrawing', type);
  var model = featureTypes[typeMap[type]];

  if(model === undefined) {
    throw new Error('Invalid feature type. Must be Point, Polygon or LineString');
  }

  model.startDrawing(this.ctx);
}
