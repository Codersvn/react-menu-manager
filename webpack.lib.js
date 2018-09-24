const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env;
const pkg = require('./package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: 'app.css'
});

let libraryName = pkg.name;

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/js/src/main.ts',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules|dist|lib/
      },
      {
        test: /\.tsx$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules|dist|lib/
      },
      {
        test: /\.css$/,
        use: extractPlugin.extract({
          use: [`css-loader`]
        }),
        exclude: /node_modules|dist|lib/
      },
      {
        test: /\.scss$/,
        use: extractPlugin.extract({
          use: [`css-loader`, `sass-loader`]
        }),
        exclude: /node_modules|dist|lib/
      },
      {
        test: /\.html$/,
        exclude: /node_modules|dist|lib/,
        use: { loader: 'raw-loader' }
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg|bmp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: ''
            }
          }
        ],
        exclude: /node_modules|dist|lib/
      },
      {
        test: /\.(ttf|eot|otf|woff|svg|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: ''
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.tsx', '.ts']
  }
};

module.exports = config;
