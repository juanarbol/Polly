const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = new UglifyJsPlugin({
  test: /\.jsx?/
})
