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

  var pos = 0

  var onMouseMove = function(e) {
    if(pos === 0) {
      feature.updateCoordinate(0, e.lngLat.lng, e.lngLat.lat);
      feature.updateCoordinate(1, e.lngLat.lng, e.lngLat.lat);
    }
    else {
      feature.updateCoordinate(pos, e.lngLat.lng, e.lngLat.lat);
    }
  }

  var onClick = function(e) {
    // did we click on the last point
    // did we click on the first point
    pos++;
  }

  var onFinish = function(e) {
    if(pos < 2) {
      stopDrawingAndRemove();
    }
    else {
      ctx.events.stopMode();
    }
  }

  return {
    start: function() {
      ctx.ui.setClass('mapbox-gl-draw_mouse-add');
      this.on('mousemove', selectAll, onMouseMove);
      this.on('click', selectAll, onClick);
      this.on('keyup', isEscapeKey, stopDrawingAndRemove);
      this.on('keyup', isEnterKey, onFinish);
    },
    stop: function() {
      ctx.ui.clearClass();
    }
  }
}
