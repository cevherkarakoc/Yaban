const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './template/index.html',
  filename: 'index.html',
  inject: 'body'
});

const UglifyPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  output: {
    comments: false,
  },
});

module.exports = {
  entry: './src/sketch.js',
  output: {
    filename: './build/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },


  plugins: [
    UglifyPluginConfig,
    HtmlWebpackPluginConfig
  ]
};