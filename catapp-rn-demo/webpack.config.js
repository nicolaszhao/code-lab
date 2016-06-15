'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('webpack-html-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '127.0.0.1';
var PORT = 3000;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname);
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';
var config = {
    paths: {
        src: path.join(ROOT_PATH, './demo/'),
        index: path.join(__dirname, './index.web'),
    },
};
module.exports = {
    ip: IP,
    port: PORT,
    devtool: 'source-map',
    resolve: {
        alias: {
            'react-native': 'MolesWeb',
            'ReactNativeART': 'react-art',
        },
        extensions: ['', '.js', '.jsx'],
    },
    entry: isProd ? [
        config.paths.index
    ] : [
        'webpack-dev-server/client?http://' + IP + ':' + PORT,
        'webpack/hot/only-dev-server',
        config.paths.index,
    ],
    output: {
        //publicPath: path.join(__dirname, 'web/output'),
        path: path.join(__dirname, 'web/output'),
        filename: 'bundle.js'
    },
    plugins: [
        new HasteResolverPlugin({
            platform: 'web',
            nodeModules: ['moles-web']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
            }
        }),
        isProd ? new webpack.ProvidePlugin({
            React: "react"
        }) : new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlPlugin()
    ],
    module: {
        loaders: [{
            test: /\.png$/,
            loader: 'url?limit=10000000&mimetype=image/png',
            include: [config.paths.src, ROOT_PATH],
        }, {
            test: /\.jpg$/,
            loader: 'url?limit=10000000&mimetype=image/jpg',
            include: [config.paths.src, ROOT_PATH]
        }, {
            test: /\.json$/,
            loader: 'json',
        },
        {
            test: /\.jsx?$/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015', 'react', 'stage-1']
            },
            include: [config.paths.src, ROOT_PATH],
        }]
    }
};
