/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');

const env = process.env.NODE_ENV || 'development';

const bimsyncCommon = {
  bimsync: {
    auth: {
      client_id: process.env.BIMSYNC_CLIENT_ID,
      client_secret: process.env.BIMSYNC_CLIENT_SECRET,
      redirect_uri: process.env.BIMSYNC_REDIRECT_URI
    },
    baseUrl: 'https://api.bimsync.com'
  }
};

const config = {
  development: {
    env: 'development',
    server: {
      port: process.env.SERVER_PORT // If changing this make sure to also update it in webpack.config.js and your redirect_uri
    },
    session_secret: process.env.SESSION_SECRET,
    indexHtmlPath: path.resolve(__dirname, '../../public/index.html'),
    ...bimsyncCommon
  },
  production: {
    env: 'production',
    server: {
      port: process.env.SERVER_PORT
    },
    session_secret: process.env.SESSION_SECRET,
    indexHtmlPath: path.resolve(__dirname, '../../dist/index.html'),
    ...bimsyncCommon
  }
};

const getConfig = () => config[env];

module.exports = getConfig;
