const types = require('./types');

var API = module.exports = function(ctx) {
  this.ctx = ctx;
}

API.prototype.add = function (geojson, opts) {
  this.ctx.store.add(geojson, opts);
}

API.prototype.get = function (id) {
  var feature = this.ctx.store.get(id);
  if (feature) {
    return feature.toGeoJSON();
  }
}

API.prototype.getAll = function() {
  return this.ctx.store.getAll().map(feature => feature.toGeoJSON());
}

API.prototype.getSelected = function() {
  return this.ctx.store.getAll()
    .filter(feature => feature.isSelected())
    .map(feature => feature.toGeoJSON());
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
    feature.update(geojson);
  }
}

API.prototype.delete = function(id) {
  this.ctx.store.delete(id);
}

API.prototype.deleteAll = function() {
  this.ctx.store.getAll().forEach(feature => feature.delete());
}

API.prototype.startDrawing = function () {
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
