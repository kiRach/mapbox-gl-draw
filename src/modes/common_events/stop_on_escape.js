var isEscapeKey = function(event) {
  return event.keyCode === 27;
}

module.exports = function(handler, ctx, feature) {
  handler.on('onKeyUp', isEscapeKey, function() {
    ctx.events.stop();
    //feature.resetToFreeze();
  });
}
