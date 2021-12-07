module.exports = {
    configureWebpack: {
      resolve: {
        extensions: [],
        alias: {
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views',
          'store': '@/store'
        }
      }
    },
    devServer: {
      proxy: { // 解决跨域问题
        '/api': {
          // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
          target: 'http://localhost:3000',
          // 允许跨域
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
  