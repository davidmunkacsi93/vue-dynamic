// Karma configuration
// Generated on Sat Mar 28 2020 15:40:48 GMT+0100 (Central European Standard Time)

module.exports = function (config) {
  config.set({
    basePath: "",

    plugins: [
      "karma-jasmine",
      "karma-babel-preprocessor",
      "karma-chrome-launcher",
      "karma-phantomjs-launcher"
    ],

    frameworks: ["jasmine"],

    files: ["test/**/*.js"],

    exclude: [],

    preprocessors: {
      "src/**/*.js": ["babel"],
      "test/**/*.js": ["babel"]
    },
    babelPreprocessor: {
      options: {
        presets: ["@babel/preset-env"],
        sourceMap: "inline"
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, ".es5.js");
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
