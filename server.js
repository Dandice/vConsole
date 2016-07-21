/* eslint-disable no-var, strict */
'use strict';

var webpack = require('webpack');
var config = require('./webpack.config');
var express = require('express');
var app = express();
var webpackMiddleware = require("webpack-dev-middleware");
var WebpackDevServer = require('webpack-dev-server');


var compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.listen(config.port, config.host, function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://' + config.host + ':' + config.port);
});


