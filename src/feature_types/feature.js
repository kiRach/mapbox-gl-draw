
var Feature = function(ctx, geojson) {
  this.ctx = ctx;
  this.userProperties = geojson.properties || {};
  this.coordinates = geojson.geometry.coordinates;
  this.id = geojson.id;
  this.type = geojson.geometry.type;

  this.drawProperties = {
    id: this.id,
    selected: false
  }
}

Feature.prototype.updateCoordinate = function(path, lon, lat) {
  var ids = path.split('.').map(x => parseInt(x, 10));
  var coordinate = this.coordinates[ids[0]];
  for(var i=1; i<ids.length; i++) {
    coordinate = coordinate[ids[i]];
  }
  coordinate[0] = lon;
  coordinate[1] = lat;
  this.ctx.store.render();
}

Feature.prototype.isSelected = function() {
  return this.drawProperties.selected;
}

Feature.prototype.select = function() {
  this.drawProperties.selected = true;
  this.ctx.store.render();
}

Feature.prototype.unselect = function() {
  this.drawProperties.selected = false;
  this.ctx.store.render();
}

Feature.prototype.update = function(geojson) {
  this.userProperties = geojson.properties || this.userProperties;
  this.coordinates = geojson.coordinates || geojson.geometry.coordinates;
  this.ctx.store.render();
}

Feature.prototype.toGeoJSON = function() {
  return JSON.parse(JSON.stringify({
    "id": this.id,
    "type": "Feature",
    "properties": this.userProperties,
    "geometry": {
      "coordinates": this.coordinates,
      "type": this.type
    }
  }));
}

Feature.prototype.forSource = function() {
  // this should return an array of features
  // where each feature is a ui element to be rendered
  // by gl draw
  // each feature should have the drawProperties and some reference to get back here
  return null;
}

module.exports = Feature;
