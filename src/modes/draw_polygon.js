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

  var pos = 0;

  var onMouseMove = function(e) {
    if(pos === 0) {
      feature.updateCoordinate(`0.${0}`, e.lngLat.lng, e.lngLat.lat);
      feature.updateCoordinate(`0.${1}`, e.lngLat.lng, e.lngLat.lat);
    }
    else {
      feature.updateCoordinate(`0.${pos}`, e.lngLat.lng, e.lngLat.lat);
    }
  }

  var onClick = function(e) {
    // did we click on the last point
    // did we click on the first point
    pos++;
    console.log(feature.coordinates);
  }

  var onFinish = function(e) {
    if(pos < 3) {
      stopDrawingAndRemove();
    }
    else {
      ctx.events.stopMode();
    }
  }

  return {
    start: function() {
      this.on('onMouseMove', selectAll, onMouseMove);
      this.on('onClick', selectAll, onClick);
      this.on('onKeyUp', isEscapeKey, stopDrawingAndRemove);
      this.on('onKeyUp', isEnterKey, onFinish);
    },
    stop: function() {

    }
  }
}
