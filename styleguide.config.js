var createNwbWebpackConfig = require('./createNwbWebpackConfig')

module.exports = {
  webpackConfig: createNwbWebpackConfig(),
  components: 'src/**/[A-Z]*.js',
}
