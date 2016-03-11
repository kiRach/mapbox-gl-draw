
module.exports = function(ctx) {

  var isDown = false;

  var events = {};
  var handlers = {
    onDrag: [],
    onClick: [],
    onDoubleClick: [],
    onMouseMove: [],
    onMouseDown: [],
    onMouseUp: [],
    onKeyDown: [],
    onKeyUp: []
  };

  function delegate(eventName, event) {
    var handles = handlers[eventName];
    var iHandle = handles.length;
    while (iHandle--) {
      var handle = handles[iHandle];
      if (handle.selector(event)) {
        handle.fn(event);
        break;
      }
    }
  }

  events.onDrag = function(event) {
    delegate('onDrag', event);
  };

  events.onClick = function(event) {
    // should do features at
    delegate('onClick', event);
  };

  events.onDoubleClick = function(event) {
    delegate('onDoubleClick', event);
  };

  events.onMouseMove  = function(event) {
    if (isDown) {
      events.onDrag(event);
    }
    else {
      delegate('onMouseMove', event);
    }
  };

  events.onMouseDown  = function(event) {
    isDown = true;
    delegate('onMouseDown', event);
  };

  events.onMouseUp  = function(event) {
    isDown = false;
    delegate('onMouseUp', event);
  };

  events.onKeyDown  = function(event) {
    delegate('onKeyDown', event);
  };

  events.onKeyUp  = function(event) {
    // if(ctx.options.keybindings) {
    //   // do more than normal
    // }
    // else {
    //   // handle enter and escape when we need too anyway
    // }
    delegate('onKeyUp', event);
  }

  return {
    on: function(event, selector, fn) {
      handlers[event].push({
        selector: selector,
        fn: fn
      });
    },
    off: function(event, selector, fn) {
      handlers[event] = handlers[event].filter(handler => {
        return handler.selector !== selector || handler.fn !== fn;
      });
    },
    addEventListeners: function() {
      ctx.map.on('click', events.onClick);
      ctx.map.on('dblclick', events.onDoubleClick);
      ctx.map.on('mousemove', events.onMouseMove);

      ctx.container.addEventListener('mousedown', events.onMouseDown);
      ctx.container.addEventListener('mouseup', events.onMouseUp);

      ctx.container.addEventListener('keydown', events.onKeyDown);
      ctx.container.addEventListener('keyup', events.onKeyUp);
    },
    removeEventListeners: function() {
      ctx.map.off('click', events.onClick);
      ctx.map.off('dblclick', events.onDoubleClick);
      ctx.map.off('mousemove', events.onMouseMove);
      ctx.container.removeEventListener('mousedown', events.onMouseDown);
      ctx.container.removeEventListener('mouseup', events.onMouseUp);
      ctx.container.removeEventListener('keydown', events.onKeyDown);
      ctx.container.removeEventListener('keyup', events.onKeyUp);
    }
  }
}
