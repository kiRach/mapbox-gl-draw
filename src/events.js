
module.exports = function(ctx) {

  ctx.events.reset = function() {}

  ctx.events.onClick = function() {}
  ctx.events.onDoubleClick = function() {}
  ctx.events.onMouseMove  = function() {}
  ctx.events.onMouseDown  = function() {}
  ctx.events.onMouseUp  = function() {}
  ctx.events.onKeyDown  = function() {}
  ctx.events.onKeyUp  = function() {
    if(ctx.options.keybindings) {
      // do more than normal
    }
    else {
      // handle enter and escape when we need too anyway
    }
  }

  return ctx;
}
