const { defineConfig } = require('@vue/cli-service')

// GitHub 项目页地址是 https://xxx.github.io/funer_website/，必须用子路径
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  publicPath: '/funer_website/',
  devServer: {
    historyApiFallback: true
  }
}) 