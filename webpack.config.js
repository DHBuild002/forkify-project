const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    openPage: 'main.html'
  },
  plugins: [
    new htmlWebpackPlugin(
      {
        filename: 'main.html',
        template: './src/main.html',
      })
  ]
};
