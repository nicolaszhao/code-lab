var path = require('path');
var webpack = require('webpack');

var PATHS = {
	src: path.join(__dirname, 'src'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {
	entry: {
		app: PATHS.src
	},
	output: {
		path: PATHS.dist,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['es2015']
				},
				include: PATHS.src
			}
		]
	}
};