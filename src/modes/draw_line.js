var stopOnEscape = require('./common_events/stop_on_escape');

var selectAll = function() {
  return true;
}

module.exports = function(ctx, feature) {

  var firstMove = function(e) {
    feature.updateCoordinate(0, e.lngLat.lng, e.lngLat.lat);
    feature.updateCoordinate(1, e.lngLat.lng, e.lngLat.lat);
  }

  var firstClick = function(e) {
    this.off('onMouseMove', selectAll, firstMove);
    this.off('onClick', selectAll, firstClick);
    this.on('onMouseMove', selectAll, afterMove);
    this.on('onClick', selectAll, afterClick);
  }

  var pos = 1;
  var afterMove = function(e) {
    feature.updateCoordinate(pos, e.lngLat.lng, e.lngLat.lat);
  }

  var afterClick = function(e) {
    pos++;
    console.log(feature.coordinates);
  }

  return {
    start: function() {
      this.on('onMouseMove', selectAll, firstMove);
      this.on('onClick', selectAll, firstClick);
      stopOnEscape(this, ctx);
    },
    stop: function() {

    }
  }
}
