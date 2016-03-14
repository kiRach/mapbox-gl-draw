
module.exports = function(parent, coord, path) {
  return {
      type: 'Feature',
      properties: {
        meta: 'vertex',
        parent: parent,
        path: path
      },
      geometry: {
        type: 'Point',
        coordinates: coord
      }
    }
}
