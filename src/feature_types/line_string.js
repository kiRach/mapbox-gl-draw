var Feature =  require('./feature');
var drawLine = require('../modes/draw_line');

var LineString = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

LineString.prototype = Object.create(Feature.prototype);

LineString.prototype.forSource = function() {
  return {};
}

LineString.startDrawing = function(ctx) {
  var geojson = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [[0, 0],[0, 0]]
      }
    }

    var line = new LineString(ctx, geojson);

    ctx.events.startMode(drawLine(ctx, line));
}

module.exports = LineString;

