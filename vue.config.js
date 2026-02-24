const { defineConfig } = require('@vue/cli-service')

// 若 GitHub Pages 使用子路径（如 https://xxx.github.io/funer_website/），
// 请将 publicPath 改为 '/funer_website/'（与仓库名一致）
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave: false,
  publicPath: '/',
  devServer: {
    historyApiFallback: true
  }
}) 