var Feature =  require('./feature');

var Polygon = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

Polygon.prototype = Object.create(Feature.prototype);

Polygon.prototype.forSource = function() {
  return {};
}

module.exports = Polygon;

