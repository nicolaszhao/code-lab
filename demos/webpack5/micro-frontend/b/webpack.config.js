const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'moduleB',
      filename: 'moduleB.js',
      exposes: {
        './util': './src/util',
      },
    }),
  ],

  module: {
    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }]
  },

  devServer: {
    open: true,
    host: 'localhost',
    port: 3002,
  }
}
