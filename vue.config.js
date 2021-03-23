module.exports = {
  // 起别名
  configureWebpack:{
    resolve:{
      // extensions:[],默认配置过了
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    }
  },
  devServer:{
    host:'127.0.0.1',
    port:8889,
    disableHostCheck:true,
  }
}