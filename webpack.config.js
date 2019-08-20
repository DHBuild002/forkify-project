const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// Deprecated method of extracting CSS - > Change to Mini
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  plugins: [
    new htmlWebpackPlugin({
        filename: 'main.html',
        template: './src/main.html',
      }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      template: '../css/style.css',
      disabled: false
    }),
  ],
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
       use: [
         {
         loader: MiniCssExtractPlugin.loader,
         },
     'css-loader',
        ],
      },
    ],
  },
};
