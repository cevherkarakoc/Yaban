const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './template/test.html',
  filename: './test/index.html',
  inject: 'body'
});

module.exports = {
  entry: './test/index.js',
  output: {
    filename: 'test/theTest.js'
  },
  
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },


  plugins: [
    HtmlWebpackPluginConfig
  ]
};