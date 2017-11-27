'use strict';

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //  -> ADDED IN THIS STEP

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
  STYLES: path.resolve(__dirname, 'source/styles/**/*.scss'),
  HTML: path.resolve(__dirname, 'source/*.html')
};


module.exports = {
  entry: path.join(paths.JS, 'app.js'), // it’s our main Javascript file where all

  // of the application’s code gets imported
  output: { //it’s the resulting Javascript file, bundled by Webpack
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  // Tell webpack to use html plugin and it’s the place where you configure which
  //  plugins Webpack will use for differen files
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    }),
    new ExtractTextPlugin('style.bundle.scss'),
    extractSass
  ],
  // Loaders configuration
  // it’s the place where you configure the loaders and are telling webpack to
  // use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, //written in regex; for file types, like search and fine
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({use: 'css-loader'})
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }, {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },

  // Enable importing JS files without specifying their's extenstion
  //
  // So we can write:
  // import MyComponent from './my-component';
  //
  // Instead of:
  // import MyComponent from './my-component.jsx';
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
      inline:true,
      port: 8002
  },
};
