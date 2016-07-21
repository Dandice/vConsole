var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var host = "lx.waimai.baidu.com";
var port = "8088";

module.exports = {
  host: host,
  port: port,
  entry: [
    'webpack-dev-server/client?http://' + host + ':' + port,
    'webpack/hot/only-dev-server',
    './src/js/Wconsole.js'
  ],  
  cache: true,
  debug: true,
  devtool: 'sourcemap',
  output: {
    publicPath: '',
    path: path.join(__dirname, 'dist'),
    filename: 'Wconsole.min.js',
    library: 'Wconsole',
    libraryTarget: 'umd',
    umdNameDefine: true
  },   
  stats: {
    colors: true,
    reasons: true
  }, 
  resolve: {
    extensions: ['', '.js', '.css', '.jsx'],
    alias: {
      'js': __dirname + '/src/js',
      'css': __dirname + '/src/css'
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/, loader: 'html'
      },
      { 
        test: /\.js$/, loader: 'babel'
      },
      {
        test: /\.css$/,
        //loader: 'style!css!less'
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') // 将css独立打包
      },
      {
        test: /\.json$/, loader: 'json'
      }
    ]
  },
  plugins: [
  // 热替换 防止报错插件
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        // new WebpackMd5Hash(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
            inject: true
        }),
    new webpack.BannerPlugin([
        pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
        'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
        pkg.license +' license'
    ].join('\n'))
    ,new ExtractTextPlugin('[name].min.css') // 将css独立打包
  ]

};