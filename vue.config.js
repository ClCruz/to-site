// vue.config.js
module.exports = {
    pwa: {
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      },
    },
  };