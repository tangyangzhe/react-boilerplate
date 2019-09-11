/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    app: './src/app.tsx'
  },

  output: {
    filename: process.env.NODE_ENV === 'prod' ? 'js/[name].[chunkhash].js' : 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    hot: true
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]__[name]-[hash:base64:6]'
            }
          },
          'resolve-url-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[hash].[ext]',
              limit: 8192
            }
          }
        ]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'react-boilerplate'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

if (process.env.NODE_ENV === 'dev') {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (process.env.NODE_ENV === 'prod') {
  config.plugins.push(new CleanWebpackPlugin(['dist']), new webpack.HashedModuleIdsPlugin());
}

module.exports = config;
