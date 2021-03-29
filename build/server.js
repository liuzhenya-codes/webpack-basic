const express = require('express')
const webpack = require('webpack')
const webpackMiddleWare = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const complier = webpack(webpackConfig)

const app = express()

app.use(webpackMiddleWare(complier, {
  // pulicePath: webpackConfig.output.pulicePath
}))

app.listen(3000, () => {
  console.log('server is running')
})