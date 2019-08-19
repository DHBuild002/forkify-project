const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


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
  module: {
   rules: [
     {
       test: /\.css$/,
       loader: ExtractTextPlugin.extract({
         fallbackLoader: 'style-loader',
         use: ['css-loader'],
         publicPath: './dist'
       })
     }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
        filename: 'main.html',
        template: './src/main.html',
      }),
    new ExtractTextPlugin({
      filename: 'style.css',
      disabled: false,
      allChunks: true
    })
  ],
};
