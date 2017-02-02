// webpack.config.js
require('babel-core/register')({
  presets: ['es2015', 'react']
});
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};

var ExtractTextPlugin = require('extract-text-webpack-plugin');

if(process.env.NODE_ENV === 'development') {
  var loaders = ['react-hot', 'babel']
} else {
  var loaders = ['babel']
}

module.exports = {
devtool: ['eval', 'source-map'],
entry: ['./app-client.js', './public/sass/main.scss'],
output: {
  path: __dirname + '/public/dist',
  filename: 'bundle.js',
  publicPath: '/dist/'
},
module: {
  loaders: [
    {
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }, 
    {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style!css!'
      )           
    },       
  ]
},
plugins: [
  new ExtractTextPlugin('../css/main.css')
]
}