const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
  output: { 
    path: path.resolve('build'), 
    filename: 'index.html'
  }
})

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CleanWebpackPluginConfig = new CleanWebpackPlugin(['build'])

module.exports = { 
  entry: ['./src/index.js'], 
  output: { 
    path: path.resolve(__dirname, 'build'), 
    filename: 'index.bundle.js'
  }, 
  module: { 
    loaders: [ 
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }, 
  plugins: [CleanWebpackPluginConfig, HtmlWebpackPluginConfig]
}