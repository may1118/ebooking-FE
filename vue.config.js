const path = require("path");

module.exports = {
  /**
   * * why do like this can see https://stackoverflow.com/questions/62196921/vue-js-configure-a-custom-alias-using-webpack
   * */
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    }
  },
  assetsDir: "./static", // 将静态资源文件放置在static文件夹中
  devServer: {
    proxy: {
      "/mock": {
        target: "http://127.0.0.1:8080",
        pathRewrite: {
          "^/mock ": "./static/mock" // 将资源放置在public/mock下
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }
}