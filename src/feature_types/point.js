var Feature =  require('./feature');

var drawPoint = require('../modes/draw_point');

var Point = function(ctx, geojson) {
  Feature.call(this, ctx, geojson);
};

Point.prototype = Object.create(Feature.prototype);

Point.prototype.addCoordinate = function() {
  throw new Error('addCoordinate cannot be called on a Point');
}

Point.prototype.selectCoordinate = function() {
  this.select();
}

Point.startDrawing = function(ctx) {
  var geojson = {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [0,0]
      }
    }

    var point = new Point(ctx, geojson);

    ctx.events.startMode(drawPoint(ctx, point));
}

module.exports = Point;
