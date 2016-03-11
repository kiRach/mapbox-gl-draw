const types = require('./types');

var API = module.exports = function(ctx) {
  this.ctx = ctx;
}

API.prototype.add = function (geojson, opts) {
  var feature = JSON.parse(JSON.stringify(geojson));
  if (feature.type === 'FeatureCollection') {
    return feature.features.map(subFeature => this.add(subFeature, options));
  }

  if (!feature.geometry) {
    feature = {
      type: 'Feature',
      id: feature.id,
      properties: feature.properties || {},
      geometry: feature
    };
  }
  return this.ctx.store.add(feature, opts);
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

API.prototype.startDrawing = function () {
  console.log(this instanceof API, this.ctx);
  this.ctx.events.reset();

  // this._handleDrawFinished();
  // var obj = null;
  // switch (type) {
  //   case this.types.POLYGON:
  //     obj = new Polygon({map: this._map});
  //     break;
  //   case this.types.LINE:
  //     obj = new Line({ map: this._map });
  //     break;
  //   case this.types.SQUARE:
  //     obj = new Square({ map: this._map });
  //     break;
  //   case this.types.POINT:
  //     obj = new Point({ map: this._map });
  //     break;
  //   default:
  //     return;
  // }

  // obj.startDrawing();
  // this._events.setNewFeature(obj);
  // var id = this._store.set(obj);
  // this.select(id)
}
