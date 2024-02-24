module.exports = ({ config }) => ({
  ...config,
  plugins: [
    ...config.plugins,
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsDownloadToken: process.env.MAPBOX_SECRET_TOKEN,
      },
    ],
  ],
});
