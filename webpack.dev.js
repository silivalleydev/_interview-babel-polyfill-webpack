const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map', // 디버깅을 위한 소스 맵
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
});
