module.exports = function(ctx, startPos) {

  var changeFns = ctx.store.getAll().map(feature => {
    var selectedCoords = feature.getSelectedCoordinatePaths ? feature.getSelectedCoordinatePaths() : [];
    var coordPos = selectedCoords.map(path => feature.getCoordinate(path));
    var numCoords = selectedCoords.length;

    if(numCoords > 0) {
      return function(endPos) {
        var lngChange = endPos.lng - startPos.lng;
        var latChange = endPos.lat - startPos.lat;

        for (var i=0; i<numCoords; i++) {
          var path = selectedCoords[i];
          var pos = coordPos[i];
          var lng = pos[0] + lngChange;
          var lat = pos[1] + latChange;
          feature.updateCoordinate(path, lng, lat);
        }

      }
    }
    else if (selectedCoords.getSelectedCoordinatePaths === undefined && feature.isSelected()) {
      var coords = JSON.parse(JSON.stringify(feature.getCoordinates()));
      return function(endPos) {
        var lngChange = endPos.lng - startPos.lng;
        var latChange = endPos.lat - startPos.lat;
        var lng = coords[0] + lngChange;
        var lat = coords[1] + latChange;
        feature.updateCoordinate('', lng, lat);
      }
    }
    else {
      return false;
    }
  }).filter(fn => fn !== false);

  return {
    start: function() {
      this.on('onDrag', function(e) {
        e.originalEvent.stopPropagation();
        changeFns.forEach(fn => fn(e.lngLat));
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
