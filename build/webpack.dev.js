const { HotModuleReplacementPlugin } = require('webpack')
const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

const devConfig = {
  mode: 'development',
  // devServer（webpack-dev-server）官方文档：https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    // open: true, // 编译完成后是否自动打开浏览器
    contentBase: './output',
    port: 9000,
    hot: true,
    hotOnly: true
  },
  // devtool 官方文档：https://webpack.docschina.org/configuration/devtool/
  // source-map 是一个映射关系，当代码运行报错时，他可以映射到实际的开发代码位置，方便调试
  // 综合推荐： development 环境使用 eval-cheap-module-source-map ；production 环境使用 cheap-module-source-map
  // source-map 原理是面试热点，请仔细阅读以下文档
  // https://segmentfault.com/a/1190000008315937
  // https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
  // http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
  // https://www.youtube.com/watch?v=NkVes0UMe9Y
  devtool: 'eval-cheap-module-source-map', // 通过eval形式将sourcemap规则放到output的js内-只带列不带行-对loader里代码也生成一个sourcemap-生成sourcemap.map文件制定output文件和源文件的映射关系
  plugins: [
    // 热更新插件
    new HotModuleReplacementPlugin()
  ],
  // tree-shaking 可以实现【将不需要的引用的代码剔除】的功能
  // 配置 optimization: { userExports: true } 即可
  // 如存在不指定import的部分，则需要配合package.json里 "sideEffects": ["*.*"] 进行配置忽略，如果没有需求，则配置为false
  // 注意：production环境下回默认配置 optimization: { userExports: true }，development环境下即使配置了optimization: { userExports: true }打包出来的代码也不会删除任何部分以保证调试准确，但是会给予一定的提示告诉你代码弃用情况
  optimization: {
    usedExports: true
  }
}

module.exports = merge(devConfig, commonConfig)