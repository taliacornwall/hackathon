module.exports = {
  entry: './app/public/script.js',
  output: {
  	path: './app/public',
  	filename: 'script.bundled.js'
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
