'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const express = require('express')
const app = new express()
const data = require('../static/data.json')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      app.get('/api/shop/:id', (req, res) => {
        const params = req.params;
        const pageSize = 5;
        const arr = [];
        let num = (params.id - 1) * pageSize;
        console.log(num);
        for (let i = 0; i < pageSize; i++) {
          if (num >= data.data.length) {
            arr.push();
          } else {
            arr.push(data.data[num]);
          }
          num += 1;
        }
        res.json({
          totalPage: data.data.length,
          arr
        })
      });
      app.get('/api/bind/:id/:page', (req, res) => {
        const params = req.params;
        console.log(params);
        const bindArr = [];
        if (params.id === '1') {
          data.data.forEach((item) => {
            console.log(item.is_bind === 1);
            if (item.is_bind === 1) {
              bindArr.push(item);
            }
          });
        }
        if (params.id === '0') {
          data.data.forEach((item) => {
            if (item.is_bind === 0) {
              bindArr.push(item);
            }
          });
        }
        const pageSize = 5;
        const arr = [];
        let num = (params.page - 1) * pageSize;
        console.log(num);
        for (let i = 0; i < pageSize; i++) {
          if (num >= bindArr.length) {
            arr.push();
          } else {
            arr.push(bindArr[num]);
          }
          num += 1;
        }
        res.json({
          totalPage: bindArr.length,
          arr
        })
      });
      app.get('/api/start/:id/:page', (req, res) => {
        const params = req.params;
        console.log(params);
        const bindArr = [];
        if (params.id === '1') {
          data.data.forEach((item) => {
            if (item.is_start === 1) {
              bindArr.push(item);
            }
          });
        }
        if (params.id === '0') {
          data.data.forEach((item) => {
            if (item.is_start === 0) {
              bindArr.push(item);
            }
          });
        }
        const pageSize = 5;
        const arr = [];
        let num = (params.page - 1) * pageSize;
        console.log(num);
        for (let i = 0; i < pageSize; i++) {
          if (num >= bindArr.length) {
            arr.push();
          } else {
            arr.push(bindArr[num]);
          }
          num += 1;
        }
        res.json({
          totalPage: bindArr.length,
          arr
        })
      });
      app.get('/api/search/:id/:page', (req, res) => {
        const params = req.params;
        console.log(params);
        const bindArr = [];
        data.data.forEach((item) => {
          //如果字符串中不包含目标字符会返回-1
          if (item.name.indexOf(params.id) >= 0) {
            bindArr.push(item);
          }
        });
        const pageSize = 5;
        const arr = [];
        let num = (params.page - 1) * pageSize;
        console.log(num);
        for (let i = 0; i < pageSize; i++) {
          if (num >= bindArr.length) {
            arr.push();
          } else {
            arr.push(bindArr[num]);
          }
          num += 1;
        }
        res.json({
          totalPage: bindArr.length,
          arr
        })
      });
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
