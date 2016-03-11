var Feature =  require('./feature');
var DrawLine = require('../modes/draw_line');

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

    var drawLine = DrawLine(ctx, line);

    ctx.events.startMode(drawLine);
}

module.exports = LineString;

