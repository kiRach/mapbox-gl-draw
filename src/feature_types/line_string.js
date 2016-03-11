var Feature =  require('./feature');

var LineString = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.forSource = function() {
  return {};
}

module.exports = LineString;

