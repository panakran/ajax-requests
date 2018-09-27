const path = require('path');
const fs = require('fs');
const gracefulFs = require('graceful-fs');

gracefulFs.gracefulify(fs);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const entryPath = './entry-webpack.js';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
  const ENV = env.NODE_ENV;
  let plugins = [];
  let enviroment;
  let bundleName;
  let exportPath;
  if (ENV === 'prod') {
    enviroment = 'production';
    plugins = [new UglifyJsPlugin({include: /\.min\.js$/})];
    bundleName = 'bundle.min';
    exportPath = './docs/[name].js';
  } else if (ENV === 'analyze') {
    plugins = [new BundleAnalyzerPlugin()];
    enviroment = 'development';
    bundleName = 'bundle';
    exportPath = './[name].js';
  } else {
    enviroment = 'development';
    bundleName = 'bundle';
    exportPath = './[name].js';
  }

  return {
    context: path.join(__dirname, ''),
    mode: enviroment,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {// used to support all browsers @https://webpack.js.org/loaders/babel-loader/
              presets: ['babel-preset-env'],
              plugins: ['transform-object-rest-spread'],
            }
          }
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, //used to load bootstrap extra files used in app
          loader: 'url-loader?limit=100000',
        }
      ]
    },
    plugins,

    entry: {
      [bundleName]: entryPath,
    },
    output: {
      path: __dirname,
      filename: exportPath,
    }

  };
};