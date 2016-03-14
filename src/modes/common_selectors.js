module.exports = {
  isOfMetaType: function(type) {
    return function(e) {
      var featureTarget = e.featureTarget;
      if (featureTarget) {
        return featureTarget.properties.meta === type;
      }
      else {
        return false;
      }
    }
  }
}
