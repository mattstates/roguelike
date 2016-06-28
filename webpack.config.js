var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/',
    filename: 'build.js',
    publicPath: '/public/'
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['stage-0', 'es2015', 'react']
        }
      },
      { test: /\.sass$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader") }
    ]
  },
  plugins: [
        new ExtractTextPlugin("style.css", {allChunks: true})
    ]
}
