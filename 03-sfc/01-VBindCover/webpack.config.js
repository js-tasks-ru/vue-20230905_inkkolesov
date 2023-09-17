const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  mode: 'production',

  entry: path.resolve(__dirname, 'main.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:6].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: {
                    localIdentName: '[name]__local__[hash:base64:6]',
                  },
                },
              },
            ],
          },
          {
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: 'vue-loader',
      },
      {
        test: /\.(svg|png|jpe?g|webp|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:6][ext]',
        },
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[contenthash:6][ext]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
};
