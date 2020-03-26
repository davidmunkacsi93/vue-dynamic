module.exports = {
  configureWebpack: config => {
    config.devtool = "source-map";
  },
  devServer: {
    proxy: {
      "/proxy": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
