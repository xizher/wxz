/* eslint-disable */

const path = require('path')
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '__tests__/test.browsers/test.js'),
  output: {
    path: path.resolve(__dirname, '__tests__/test.browsers/dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env',
          {
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        ],
      },
    }]
  }
}
