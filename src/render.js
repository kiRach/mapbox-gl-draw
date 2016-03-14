var createMidpoints = require('./lib/create_midpoints');
var createVertices = require('./lib/create_vertices');

module.exports = function() {
  var isStillAlive = this.ctx.map.getSource('draw') !== undefined;
  if (isStillAlive) { // checks to make sure we still have a map
    var featureBuckets = Object.keys(this.features).reduce((buckets, id) => {
      let geojson = this.features[id].toGeoJSON();
      geojson.properties.drawId = id;


      if (this.features[id].selected === true) {
        buckets.selected.push(geojson);
        buckets.selected = buckets.selected.concat(createMidpoints([this.features[id]], this.ctx.map), createVertices([this.features[id]]));
      }
      else {
        buckets.deselected.push(geojson);
      }
      return buckets;
    }, { deselected: [], selected: [] });

    if(featureBuckets.selected.length > 0) {
      this.ctx.ui.showButton('trash');
    }
    else {
      this.ctx.ui.hideButton('trash');
    }


    this.ctx.map.getSource('draw').setData({
      type: 'FeatureCollection',
      features: featureBuckets.deselected
    });

    this.ctx.map.getSource('draw-selected').setData({
      type: 'FeatureCollection',
      features: featureBuckets.selected
    });
  }
}
