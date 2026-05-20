const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',
  devtool: 'source-map',
};
