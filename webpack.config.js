const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['./src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
				fiilename: 'index.html',
				template: './src/index.html'
			})
 	],
	module: {
		rules: [{
			test: /\.(svg|png|jpg|gif) $/,
			use: 'file-loader?name=[path][name].[hash].[ext]',
	}]
	}
};
