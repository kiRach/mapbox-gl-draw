var {isOfMetaType, noFeature, isShiftDown} = require('./common_selectors');
var dragVertex = require('./drag_vertex');
var dragFeature = require('./drag_feature');

module.exports = function(ctx) {

  var onVertex = function(e) {
    var about = e.featureTarget.properties;
    var feature = ctx.store.get(about.parent || about.id);

    if (isShiftDown(e) === false) {
      ctx.api.unselectAll();
      // this shouldn't unselect if this this is selected
    }

    feature.selectCoordinate(about.path);
    ctx.events.startMode(dragVertex(ctx, e.lngLat));
  }

  var onMidpoint = function(e) {
    var about = e.featureTarget.properties;
    var feature = ctx.store.get(about.parent);
    feature.addCoordinate(about.path, about.lng, about.lat);
    feature.selectCoordinate(about.path);
    ctx.events.startMode(dragVertex(ctx, e.lngLat));
  }

  var onNoFeatureClick = function(e) {
    console.log();
    ctx.api.unselectAll();
  }

  return {
    start: function() {
      this.on('onMouseDown', isOfMetaType('vertex', ctx), onVertex);
      this.on('onMouseDown', isOfMetaType('midpoint', ctx), onMidpoint);
      this.on('onClick', noFeature, onNoFeatureClick);
    },
    stop: function() {
      console.log('I guess you don\' want to browse any more');
    }
  }
}
