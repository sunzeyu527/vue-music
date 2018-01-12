<<<<<<< HEAD
'use strict'
=======
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
require('./check-versions')()

process.env.NODE_ENV = 'production'

<<<<<<< HEAD
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
=======
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
<<<<<<< HEAD
  webpack(webpackConfig, (err, stats) => {
=======
  webpack(webpackConfig, function (err, stats) {
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
<<<<<<< HEAD
      children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
=======
      children: false,
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
      chunks: false,
      chunkModules: false
    }) + '\n\n')

<<<<<<< HEAD
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

=======
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
