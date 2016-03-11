var Feature =  require('./feature');
var drawPolygon = require('../modes/draw_polygon');

var Polygon = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
  this.coordinates = this.coordinates.map(coords => coords.slice(0, -1));
};

Polygon.prototype = Object.create(Feature.prototype);

Polygon.prototype.forSource = function() {
  return {};
}

Polygon.startDrawing = function(ctx) {
  var geojson = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[0,0], [0, 0],[0, 0]]]
      }
    }

    var polygon = new Polygon(ctx, geojson);

    ctx.events.startMode(drawPolygon(ctx, polygon));
}

module.exports = Polygon;

