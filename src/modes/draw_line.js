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
    // did we click on the last point
    // did we click on the first point
    pos++;
    console.log(feature.coordinates);
  }

  var onFinish = function(e) {
    if(feature.type === 'LineString' && pos < 2) {
      stopDrawingAndRemove();
    }
    else if (feature.type === 'Polygon' && pos < 3) {
      stopDrawingAndRemove();
    }
    else {
      ctx.events.stopMode();
    }
  }

  return {
    start: function() {
      this.on('onMouseMove', selectAll, firstMove);
      this.on('onClick', selectAll, firstClick);
      this.on('onKeyUp', isEscapeKey, stopDrawingAndRemove);
      this.on('onKeyUp', isEnterKey, onFinish);
    },
    stop: function() {

    }
  }
}
