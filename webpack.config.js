module.exports = {
  entry: ["babel-polyfill", "./app/public/script.js"],
  output: {
  	path: './app/public',
  	filename: '[name].bundled.js'
  },
	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['env']
	      }
	    }
	  ]
	}
};