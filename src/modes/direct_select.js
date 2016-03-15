var dragVertex = require('./drag_vertex');
var {noFeature, isOfMetaType, isShiftDown} = require('./common_selectors');

module.exports = function(ctx, featureId) {
  // This mode lets you select vertexes and move them around
  // it only lets you do this for one feature
  // the trash can, when you are in this mode, deletes vertecies if any are selected
  // or this single feature otherwise.

  var isThisFeature = function(e) {
    return e.featureTarget && e.featureTarget.properties.parent == featureId;
  }

  var feature = ctx.store.get(featureId);

  var onVertex = function(e) {
    console.log('here');
    if (isThisFeature(e)) {
      var about = e.featureTarget.properties;
      if (isShiftDown(e) === false) {
        ctx.api.unselectAll();
        // this shouldn't unselect if this this is selected
      }

      feature.selectCoordinate(about.path);
      ctx.events.startMode(dragVertex(ctx, e.lngLat));
    }
  }

  var selectVertex = function(e) {
    var about = e.featureTarget.properties;
    if (isShiftDown(e) === false) {
      ctx.api.unselectAll();
      // this shouldn't unselect if this this is selected
    }

    feature.selectCoordinate(about.path);
  }

  var onMidpoint = function(e) {
    var about = e.featureTarget.properties;
    feature.addCoordinate(about.path, about.lng, about.lat);
    feature.selectCoordinate(about.path);
    ctx.events.startMode(dragVertex(ctx, e.lngLat));
  }

  return {
    start: function() {
      feature.drawProperties.direct_selected = true;
      this.on('mousedown', isOfMetaType('vertex'), onVertex);
      this.on('mousedown', isOfMetaType('midpoint'), onMidpoint);
      this.on('click', isOfMetaType('vertex'), selectVertex);
      this.on('click', noFeature, function(e) {
        ctx.api.unselectAll();
        ctx.events.stopMode();
      });
      this.on('delete', function() {
        if (feature.deleteSelectedCoords) {
          feature.deleteSelectedCoords();
          if (ctx.store.get(featureId) === undefined) {
            ctx.events.stopMode();
          }
        }
      });
    },
    stop: function() {
      feature.drawProperties.direct_selected = false;
    }
  }
}
