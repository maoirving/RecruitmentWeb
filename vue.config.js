module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/sass/utils/variables.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('import-glob')
      .test(/\.scss/)
      .use('import-glob-loader2')
      .loader('import-glob-loader2')
      .end()
  }
}
