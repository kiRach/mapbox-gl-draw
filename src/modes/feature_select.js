var {noFeature, isShiftDown, isFeature} = require('./common_selectors');

var dragFeature = require('./drag_feature');
var directSelect = require('./direct_select');

module.exports = function(ctx) {

  return {
    start: function() {
      this.on('click', noFeature, function(e) {
        ctx.api.unselectAll();
      });
      this.on('doubleclick', isFeature, function(e) {
        ctx.events.startMode(directSelect(ctx, e.featureTarget.properties.id));
      });
    },
    stop: function() {
      console.log('I guess you don\' want to browse any more');
    }
  }
}
