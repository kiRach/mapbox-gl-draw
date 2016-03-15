module.exports = {
  isOfMetaType: function(type) {
    return function(e) {
      var featureTarget = e.featureTarget;
      if (featureTarget) {
        console.log(featureTarget.properties.meta, type);
        return featureTarget.properties.meta === type;
      }
      else {
        return false;
      }
    }
  },
  noFeature: function(e) {
    return e.featureTarget === undefined;
  },
  isFeature: function(e) {
    return e.featureTarget !== undefined && e.featureTarget.properties.meta === 'feature';
  },
  isShiftDown: function(e) {
    return e.originalEvent.shiftKey === true;
  }
}
