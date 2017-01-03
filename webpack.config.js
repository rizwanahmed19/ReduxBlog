var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackPluginConfig = new htmlWebpackPlugin({
	template: './src/main.html',
	filename: 'index.html',
	inject: 'body'
});
module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'./src/app.js'
	],
	output: {
		path: __dirname + '/public/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015', 'stage-2']
				} 
			}
		]
	},
	plugins: [
		htmlWebpackPluginConfig
	]
};