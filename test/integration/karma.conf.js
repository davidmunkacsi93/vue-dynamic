module.exports = function (config) {
  config.set({
    basePath: '',

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-safari-private-launcher',
      'karma-firefox-launcher'
    ],

    frameworks: ['jasmine'],

    files: ['./specs/**/*.js'],

    exclude: [],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.js$/i,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      optimization: {
        minimize: false
      }
    },
    preprocessors: {
      './specs/**/*.js': ['webpack']
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,
    autoWatch: true,
    browsers: ['Chrome'],
    // browsers: ['Chrome', 'Firefox', 'SafariPrivate'],
    singleRun: false,
    concurrency: Infinity,

    browserDisconnectTimeot: 300000,
    browserNoActivityTimeout: 300000,
    processKillTimeout: 300000
  });
};
