let mix = require('laravel-mix');
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
		module: {
			rules: [	
				{
					exclude: /(node_modules|bower_components)/,
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env', 'react'],
							plugins: ['transform-object-rest-spread','transform-decorators-legacy']
						}
					}
				},
				{
					test: /\.css$/,
					use: ['style-loader, sass-loader,less-loader, css-loader'],
				},
				{
    				test: /\.(png|jpg)$/,
    				loader: 'url?limit=25000'
    			},
				{   			
				    test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
				    loader: 'file-loader',
				}

			]
		},
		plugins: [

			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
			})
		]
	});

mix.react('resources/assets/js/index.js', 'public/js/app.js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .version();
