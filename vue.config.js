module.exports = {
  configureWebpack: config => {
    config.devtool = "#inline-source-map";
    config.vue = {
      loaders: {
        js: "babel-loader"
      }
    };
  }
};
