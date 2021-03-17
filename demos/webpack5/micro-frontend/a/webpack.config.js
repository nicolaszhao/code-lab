const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  plugins: [
    new HtmlWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'moduleA',
      filename: 'moduleA.js',
      exposes: {
        './hello': './src/hello',
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
    port: 3001,
  }
}
