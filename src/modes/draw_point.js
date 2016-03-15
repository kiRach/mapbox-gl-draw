var selectAll = function() {
  return true;
}

var isEscapeKey = function(e) {
  return e.keyCode === 27;
}

var isEnterKey = function(e) {
  return e.keyCode === 13;
}

module.exports = function(ctx, feature) {

  var stopDrawingAndRemove = function() {
    ctx.events.stopMode();
    ctx.store.delete(feature.id);
  }

  var onMouseMove = function(e) {
    feature.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);
  }

  var onClick = function(e) {
    ctx.events.stopMode();
  }

  return {
    start: function() {
      ctx.ui.setClass('mapbox-gl-draw_mouse-add');
      this.on('mousemove', selectAll, onMouseMove);
      this.on('click', selectAll, onClick);
      this.on('keyup', isEscapeKey, stopDrawingAndRemove);
      this.on('keyup', isEnterKey, stopDrawingAndRemove);
    },
    stop: function() {
      ctx.ui.clearClass();
    }
  }
}
