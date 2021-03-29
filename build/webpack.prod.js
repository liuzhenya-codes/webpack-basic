
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

const prodConfig = {
  mode: 'production',
  // devtool 官方文档：https://webpack.docschina.org/configuration/devtool/
  // source-map 是一个映射关系，当代码运行报错时，他可以映射到实际的开发代码位置，方便调试
  // 综合推荐： development 环境使用 eval-cheap-module-source-map ；production 环境使用 cheap-module-source-map
  // source-map 原理是面试热点，请仔细阅读以下文档
  // https://segmentfault.com/a/1190000008315937
  // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
  // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
  // https://www.youtube.com/watch?v=NkVes0UMe9Y
  devtool: 'cheap-module-source-map' // 通过eval形式将sourcemap规则放到output的js内-只带列不带行-对loader里代码也生成一个sourcemap-生成sourcemap.map文件制定output文件和源文件的映射关系
}

module.exports = merge(prodConfig, commonConfig)