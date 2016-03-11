const types = require('./types');
var {createButton, DOM} = require('./util');

module.exports = function(ctx) {

  var buttons = {};

  ctx.ui = {
    addButtons: function() {
      var controlClass = 'mapbox-gl-draw_ctrl-draw-btn';
      var controls = ctx.options.controls;
      var ctrlPos = 'mapboxgl-ctrl-top-left';

      let controlContainer = ctx.container.getElementsByClassName(ctrlPos)[0].getElementsByClassName('mapboxgl-ctrl-group')[0];

      if (controls.line) {
        buttons[types.LINE] = createButton(controlContainer, {
          className: `${controlClass} mapbox-gl-draw_line`,
          title: `LineString tool ${ctx.options.keybindings && '(l)'}`,
          fn: () => ctx.api.startDrawing(types.LINE)
        }, controlClass);
      }

      if (controls[types.POLYGON]) {
        buttons[types.POLYGON] = createButton(controlContainer, {
          className: `${controlClass} mapbox-gl-draw_polygon`,
          title: `Polygon tool ${ctx.options.keybindings && '(p)'}`,
          fn: () => ctx.api.startDrawing(types.POLYGON)
        }, controlClass);
      }

      if (controls[types.POINT]) {
        buttons[types.POINT] = createButton(controlContainer, {
          className: `${controlClass} mapbox-gl-draw_point`,
          title: `Marker tool ${ctx.options.keybindings && '(m)'}`,
          fn: () => ctx.api.startDrawing(types.POINT)
        }, controlClass);
      }

      if (controls.trash) {
        buttons.trash = createButton(controlContainer, {
          className: `${controlClass} mapbox-gl-draw_trash`,
          title: 'delete',
          fn: function() {
            ctx.store.getAll()
              .filter(feature => feature.isSelected())
              .forEach(feature => ctx.store.delete(feature.id));
          },
        }, controlClass);

        ctx.ui.hideButton('trash');
      }
    },
    hideButton: function(id) {
      if (buttons[id]) {
        buttons[id].style.display = 'none';
      }
    },
    showButton: function (id) {
      if (buttons[id]) {
        buttons[id].style.display = 'block';
      }
    },
    setButtonActive: function(id) {
      if (buttons[id] && id !== 'trash') {
        buttons[id].classList.add('active');
      }
    },
    setAllInactive: function(id) {
      var buttonIds = Object.keys(buttons);

      buttonIds.forEach(buttonId => {
        if (buttonId !== 'trash') {
          var button = buttons[buttonId];
          button.classList.remove('active');
        }
      });
    },
    removeButtons: function() {
      var buttonIds = Object.keys(buttons);

      buttonIds.forEach(buttonId => {
        var button = buttons[buttonId];
        button.parentNode.removeChild(button);
        buttons[buttonId] = null;
      });
    }
  }
}
