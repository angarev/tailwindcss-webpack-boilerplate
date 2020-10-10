const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/js/app.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					'postcss-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: './images',
					name: '[name].[ext]',
					context: 'src',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
				options: {
					outputPath: './fonts',
					context: 'src',
				},
			},
		],
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'src'),
		watchContentBase: true,
		hot: true,
		port: 9000,
		open: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			inject: true,
			filename: 'index.html',
		}),
		new ImageminPlugin({
			disable: process.env.NODE_ENV !== 'production',
			pngquant: { quality: [0.5, 0.5] },
			plugins: [imageminMozjpeg({ quality: 50 })],
		}),
	],
};
