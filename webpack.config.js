// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入 HtmlWebpackPlugin，用於生成 HTML 檔案
const { VueLoaderPlugin } = require('vue-loader'); // 引入 VueLoaderPlugin，用於處理 Vue 檔案
const webpack = require('webpack');

// 匯出 webpack 設定物件
module.exports = {
  // 入口檔案，這裡是您的應用程式入口點
  entry: './src/vue.js',

  // 輸出的 bundle 檔案設定
  output: {
    filename: 'bundle.js', // 打包後的檔名
    path: path.resolve(__dirname, 'dist'), // 打包後的路徑，此處設定為 dist 目錄
  },

  // 設定處理各種不同檔案的規則
  module: {
    rules: [
      {
        test: /\.vue$/, // 匹配 .vue 檔案
        loader: 'vue-loader' // 使用 vue-loader 處理 Vue 單文件元件
      },
      {
        test: /\.scss$/, // 匹配 .scss 檔案
        use: [
          'style-loader', // 將編譯後的 CSS 以 <style> 插入到 HTML 文件中
          'css-loader', // 解析 CSS 檔案後，將其轉換為 CommonJS 模塊
          'sass-loader' // 將 SCSS 轉換為 CSS
        ]
      },
      {
        test: /\.js$/, // 匹配 .js 檔案
        exclude: /node_modules/, // 排除 node_modules 目錄下的檔案
        use: {
          loader: 'babel-loader', // 使用 babel-loader 處理 JavaScript 檔案
          /* 當遇到 .js 結尾的文件時（JavaScript 檔案），這個規則告訴 webpack 使用 babel-loader 進行處理。
          babel-loader 通常被用來將新版本的 JavaScript 代碼（如 ES6+）轉換為相容於舊版瀏覽器的 JavaScript */
        },
      },
    ]
  },

  // 插件配置，用於執行各種額外任務，比如生成 HTML 文件和處理 Vue 檔案
  plugins: [
    // 生成 HTML 文件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 使用 HtmlWebpackPlugin 生成 HTML 檔案
      /*會根據指定的模板 (template: './src/index.html') 生成一個 HTML 檔案，
      並自動將 webpack 打包生成的 JavaScript 或 CSS 檔案引入這個 HTML 檔案中。 */
    }),

    // 添加 VueLoaderPlugin，用於處理 .vue 檔案
    new VueLoaderPlugin(),
    /*VueLoaderPlugin 能夠協助 Vue 的預處理器、樣式等被正確地轉換和整合到 webpack 的構建過程中。 */

    // 定義全域變數，這裡定義了兩個 Vue 的全域變數
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false,
    }),
  ],

  // 解析模組時應該尋找的擴展名和模組別名配置
  resolve: {
    extensions: ['.js', '.vue'], // 定義可以省略的擴展名
    //如果有一個檔案叫做 example.js，在 import 時可以只寫 import example from './example'; 而不用寫成 import example from './example.js';。
    alias: {
        'vue': 'vue/dist/vue.esm-bundler.js',
        /*當您在程式碼中 import Vue 時，Webpack 會將所有的 import 'vue' 或 require('vue') 
        轉換成 import 'vue/dist/vue.esm-bundler.js'或 require('vue/dist/vue.esm-bundler.js')。
        這樣做的目的可能是為了直接使用 Vue 的 ESM（ES Module）版本或特定的 Vue 打包版本。 */
    },
  },
};
