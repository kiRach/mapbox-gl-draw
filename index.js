'use strict';

require('./src/lib/polyfills');
var Setup = require('./src/setup');
var Options = require('./src/options');
var API = require('./src/api');
const types = require('./src/types');

var Draw = function(options) {
  options = Options(options);

  var ctx = {
    options: options
  };

  var api = new API(ctx);
  ctx.api = api;

  var setup = Setup(ctx);
  api.addTo = setup.addTo;
  api.remove = setup.remove;
  api.types = types;

  return api;
}

if (window.mapboxgl) {
  mapboxgl.Draw = Draw;
} else if (typeof module !== 'undefined') {
  module.exports = Draw;
}
