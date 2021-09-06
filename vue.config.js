module.exports = {
  // devServer: {
  //   port: 8080,
  //   hot: true,
  //   hotOnly: true,
  //   proxy: {
  //     '/api': {
  //       // 对接Atom Boot后台
  //       // target: 'http://localhost:8080/',
  //       target: 'http://127.0.0.1:8888/',
  //       // 对接Atom Cloud后台
  //       //target: 'http://localhost/',
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }
  //   }
  // },

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
