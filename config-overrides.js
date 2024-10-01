const path = require('path');

module.exports = function override(config, env) {
  if (env === process.env.REACT_APP_ENV) {
    // Disable filename hashing for JS
    config.output.filename = 'static/js/main.js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';

    // Disable filename hashing for CSS
    config.plugins.forEach(plugin => {
      if (plugin.constructor.name === 'MiniCssExtractPlugin') {
        plugin.options.filename = 'static/css/main.css';
        plugin.options.chunkFilename = 'static/css/[name].chunk.css';
      }
    });

    // Set the public path to your module's directory
    config.output.publicPath = '/modules/custom/tb_drug_dose/';
  }
  return config;
};