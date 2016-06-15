var path = require('path');

var webpack = require('webpack'),

	// html输出插件，主要是单页应用
	HtmlWebpackPlugin = require('html-webpack-plugin');

// 读取package信息，用于生产环境第三方库、框架的独立打包
var pkg = require('./package.json');

var PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

module.exports = {

	// 如果entry下面的子项是一个目录，index.js将作为入口文件
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015']
				},
				include: PATHS.app
			},
			{
				test: /.(css|less)$/,
				loaders: ['style', 'css', 'less'],
				include: PATHS.app
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url',

				// 小于8k的图片文件直接用base64 inline
				query: {
					limit: 8192
				},
				include: PATHS.app
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};