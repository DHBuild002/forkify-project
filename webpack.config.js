const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
// Deprecated method of extracting CSS - > Change to Mini
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// Was trying to work out how to send images folder to dist from src
//const fileLoader = require('file-loader');

module.exports = {
  entry: ['@babel/polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
    // Solution if you would like to use your own filename for your HTML page:
    // open: true,
    // openPage: 'main.html'
    // Webpack Server will only work by default with index.html
  },
  plugins: [
    new htmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      }),
    new miniCssExtractPlugin({
      filename: 'style.css',
      template: './src/css/style.css',
    })
  ],
  module: {
    rules: [
     {
       test: /\.css$/,
       use: [
         {
         loader: miniCssExtractPlugin.loader,
       },
     'css-loader',
        ],
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
            },
        ]
      }
    ],
  },
};
