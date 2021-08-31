module.exports = {
  chainWebpack: config => {
    config.module
      .rule('import-glob')
      .test(/\.scss/)
      .use('import-glob-loader2')
      .loader('import-glob-loader2')
      .end()
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/sass/utils/variables.scss";`
      }
    }
  }
}
