const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      remotes: {
        moduleA: 'moduleA@http://localhost:3001/moduleA.js',
        moduleB: 'moduleB@http://localhost:3002/moduleB.js',
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
    port: 3003,
  }
}
