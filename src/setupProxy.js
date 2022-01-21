// 注：本项目后端已经实现 CORS，这里只是演示

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    // 代理标识
    '/api',
    // 代理配置
    createProxyMiddleware({
      // 目标服务器地址
      target: 'http://toutiao.itheima.net/v1_0/',
      changeOrigin: true,
      pathRewrite: {
        // 去掉接口中的 /api 前缀
        '^/api': ''
      }
    })
  )
}
