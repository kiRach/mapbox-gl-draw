var selectAll = function() {
  return true;
}

module.exports = function(ctx) {

  var onClick = function(e) {
    console.log('woot');
  }

  return {
    start: function() {
      ctx.events.on('onClick', selectAll, onClick);
    },
    stop: function() {
      ctx.events.off('onClick', selectAll, onClick);
    }
  }
}
