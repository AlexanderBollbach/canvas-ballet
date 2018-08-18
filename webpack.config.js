
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ["react", 'stage-2']
			}
		},
    {
      test: /\.css$/,
      loader: "style-loader"
    },
    {
      test: /\.css$/,
      loader: "css-loader",
      query: {
        modules: true,
        localIdentName: "[name]__[local]___[hash:base64:5]"
      }
    }
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map',
	devServer: {
		contentBase: "./dist",
		hot: false,
	},

	resolve: {
		
		alias: {
			_src: path.resolve(__dirname, 'src/'),
			_components: path.resolve(__dirname, 'src/components/'),
			_redux: path.resolve(__dirname, 'src/redux/'),
			_managers: path.resolve(__dirname, 'src/managers/'),
			_entities: path.resolve(__dirname, 'src/entities/')
		}
	}
};