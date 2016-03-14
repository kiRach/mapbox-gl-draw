var {isOfMetaType} = require('./common_selectors');
var dragVertex = require('./drag_vertex');

module.exports = function(ctx) {

  var onVertex = function(e) {
    ctx.events.startMode(dragVertex(ctx, e.featureTarget.properties.parent, e.featureTarget.properties.path));
  }

  var onMidpoint = function(e) {
    var about = e.featureTarget.properties;
    var feature = ctx.store.get(about.parent);
    console.log(about, feature);
    feature.addVertex(about.path, about.lng, about.lat);
    ctx.events.startMode(dragVertex(ctx, about.parent, about.path));
  }

  return {
    start: function() {
      this.on('onMouseDown', isOfMetaType('vertex'), onVertex);
      this.on('onMouseDown', isOfMetaType('midpoint'), onMidpoint);
    },
    stop: function() {
      console.log('I guess you don\' want to browse any more');
    }
  }
}
