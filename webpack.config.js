const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

/**
 * BASE
 */
let config = {
	entry: {
		'styles': './src/styles.js',
		'vendor': './src/vendor.js',
		'app': './src/app.js'
	},
	output: {
		publicPath: '/dist/',
		path: './public/dist/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	resolve: {
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
			  	test: /\.html$/,
			  	loader: 'html'
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css?sourceMap', 'postcss', 'raw']
			}
		]
	},
    
    postcss: function () {
        return [autoprefixer];
    },
    
	plugins: [
	 	new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
		new webpack.optimize.CommonsChunkPlugin({
	    	name: ['app', 'vendor', 'styles']
	  	}),
	],

	devServer: {
		devtool: 'cheap-module-eval-source-map',
		contentBase: './public',
		headers: { 
			'Access-Control-Allow-Origin': '*'
		},
		hot: true,
		noInfo: true,
		stats: {
			colors: true
		}
	}
};

module.exports = config;