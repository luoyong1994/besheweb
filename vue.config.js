module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    //设生产的时候注释掉
    devServer: {
      host:'localhost',
      port:8080,
      proxy: {
        '/bishe': {
          target: 'http://localhost:8088/',
          changeOrigin: true,
          pathRewrite: {}
        }
      }
    },
    publicPath: process.env.NODE_ENV === "production" ? "/" : "/", //部署应用包时的基本 URL
    outputDir: "dist", //打包目录
    indexPath: "index.html"
  }