const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      open: true,
      port: 3000,
      proxy: {
        '/ips': {
          target: 'http://www-wms-java.itheima.net', // 跨域请求的地址'
          changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
        },
        '/api': {
          target: 'http://www-wms-java.itheima.net', // 跨域请求的地址'
          changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
        }
      }
    }
  }
})
