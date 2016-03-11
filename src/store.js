var Store = module.exports = function(ctx) {
  this.ctx = ctx;
  this.features = {};
}

Store.prototype.render = function() {};

Store.prototype.add = function(feature) {
  this.features[feature.id] = feature;
  return feature.id;
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
