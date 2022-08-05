module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    lintOnSave: false, //关闭eslint检查
    devServer: {
        proxy: {
            '/web':{
              target:'http://www.coldairance.com/',
                changeOrigin:true,//允许跨域
                ws: true,            //是否代理 websockets
                secure: true,          //是否https接口
                pathRewrite:{
                  '^/web': ''
                }
            },
            '/api':{//此处并非一定和url一致。
                target:'http://api.zhuishushenqi.com',
                changeOrigin:true,//允许跨域
                pathRewrite:{
                  '^/api': ''
                }
              },
            },
    }
}