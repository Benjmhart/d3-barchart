const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    module: {
        rules: [{
            test: /\.scss$/,
            use: [  {
							loader: 'file-loader',
							options: {
								name: '[name].css',
								outputPath: 'assets/css/'
							}
						},
						{
							loader: 'extract-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}],
						
            }]
        }
});
