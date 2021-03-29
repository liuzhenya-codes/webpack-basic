const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: { // 入口文件
    main: './src/js/index.js' // 入口主文件
    // second:  './src/js/index.js' // 入口文件可以有多个，配置多个入口文件时，出口文件名需要使用占位符[name]防止文件重名导致打包失败
  },
  output: { // 出口文件
    // publicPath: 'https://www.*.com', // 配置为cdn域名
    // publicPath: './', 在 npm run build 下使用，不配置也可以，为避免不必要的出错，建议不配置
    // publicPath: '/', 在 npm run dev 下使用，不配置也可以，为避免不必要的出错，建议不配置
    filename: '[name].js', // 打包出的主文件名称
    path: path.resolve(__dirname, 'output')  // 打包出的文件放在当前目录下的output文件夹下
  },
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
    // HtmlWebpackPlugin 会在打包结束后自动生成一个html文件，并把打包生成的js文件自动引入到这个HTML中
    // https://webpack.docschina.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // CleanWebpackPlugin 会在打包之前调用，先删除指定打包目录下的所有内容，防止老旧打包文件对接下来的打包操作进行干扰
    // https://www.npmjs.com/package/clean-webpack-plugin
    new CleanWebpackPlugin({}),
    // 热更新插件
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jpg$/,
        // file-loader
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: '[name]_[hash}.[ext]',
        //     outputPath: 'images/'
        //   }
        // },
        // url-loader，区别于file-loader，url-loader可以定义limit，标识文件的大小，小于此值，解析为base64以减少图片http请求，大于此值，和file-loader一样打包为图片，合理分配打包资源以达到最佳的加载速度
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 10240
          }
        }
      },
      // 样式文件的引用顺序是倒序的，scss => css => style
      // 1.scss 文件会被翻译为 css
      // 2.css-loader 会分析出几个 css 文件之间的关系，最终把这些 css 文件合并成一段 css，注意 css-loader 并不会解析 css，它仅仅是把 css 文件各模块引用整合到一起而已
      // 3.style-loader 会把这段内容挂载到页面的head部分
      {
        test: /\.scss$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 由于css-loader 只能分析 css 文件，因此如果 css 文件之中还有 scss 的引用，就会解析失败，加上 importLoaders: 2，即可使得 css 中的 scss 也会从 最开始的步骤开始解析
              modules: true // css-module 使得一个样式只会对当前文件生效：import style from '' => classList.add(style.*)
            }
          },
          { // 注意是 sass-loader 来编译 scss，字母不一样，实际上 scss 是 sass 的最新版本，scss 本质上还是 sass
            // sass-loader 安装时需要安装两个包：sass-loader 和 node-sass，否则会有引用缺失报错
            loader: 'sass-loader'
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: '/node_modules',
        use: {
          loader: 'babel-loader', // user bable loader 打通 bable loader 和 webpack 之间的联系
          // // 使用 .babelRc 文件管理 options，此处 options内容全部放到 .babelRc 内
          // options: {
          //   // presets: [
          //   //   // 使用 @babel/preset-env 把es6基础语法解析为es5
          //   //   ['@babel/preset-env', {
          //   //     corejs: 3, // <---  此处加个这个，就没有报错警告了
          //   //     useBuiltIns: 'usage' // 当使用了babel-polyfill后，需要按需注入es6新API到es5，否则会导致打包文件有过多无用代码
          //   //   }]
          //   // ]
          //   plugins: [
          //     ['@babel/plugin-transform-runtime', {
          //       corejs: false,
          //       helpers: true,
          //       regenerator: true,
          //       userESModules: false
          //     }]
          //   ]
          // }
        }
      }
    ]
  }
}