var createNwbWebpackConfig = require('./createNwbWebpackConfig')

module.exports = {
  webpackConfig: createNwbWebpackConfig(),
  components: 'src/**/[A-Z]*.js',
  template: {
    head: {
      links: [
        {
          href:
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
          rel: 'stylesheet',
        },
      ],
    },
  },
}
