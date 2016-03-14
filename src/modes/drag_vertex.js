module.exports = function(ctx, featureId, vertexPath) {

  var feature = ctx.store.get(featureId);

  return {
    start: function() {
      this.on('onDrag', function(e) {
        e.originalEvent.stopPropagation();
        feature.updateCoordinate(vertexPath, e.lngLat.lng, e.lngLat.lat);
      });
      this.on('onMouseUp', function() {
        ctx.events.stopMode();
      });
    },
    stop: function() {
      console.log('we\'re done dragging');
    }
  }

}
