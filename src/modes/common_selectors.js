module.exports = {
  isOfMetaType: function(type, ctx) {
    return function(e) {
      var featureTarget = e.featureTarget;
      if (featureTarget) {
        var feature = ctx.store.get(featureTarget.properties.id);
        return featureTarget.properties.meta === type || (feature && type === 'vertex' && feature.type === 'Point');
      }
      else {
        return false;
      }
    }
  },
  noFeature: function(e) {
    return e.featureTarget === undefined;
  },
  isShiftDown: function(e) {
    return e.originalEvent.shiftKey === true;
  }
}
