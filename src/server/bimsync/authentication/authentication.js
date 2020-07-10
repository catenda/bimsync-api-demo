/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const qs = require('qs');
const config = require('../../config')();
const { axiosBimsync } = require('../axios');

const initCodeFlow = () => axiosBimsync({
  method: 'get',
  url: '/oauth2/authorize',
  headers: {
    'Content-Type': 'text/html'
  },
  params: {
    ...config.bimsync.auth,
    response_type: 'code',
    prompt: 'none'
  }
});

const storeTokensInSession = (req, tokenResponse) => {
  if (tokenResponse.status === 200) {
    req.session.accessToken = tokenResponse.data.access_token;
    req.session.refreshToken = tokenResponse.data.refresh_token;
  }
};

const tokenHeaders = {
  'Content-type': 'application/x-www-form-urlencoded'
};

const getAccessTokenByCode = (code, req) => axiosBimsync(
  {
    method: 'post',
    url: '/oauth2/token',
    headers: tokenHeaders,
    data: qs.stringify({
      grant_type: 'authorization_code',
      client_id: config.bimsync.auth.client_id,
      client_secret: config.bimsync.auth.client_secret,
      redirect_uri: config.bimsync.auth.redirect_uri,
      code
    })
  }
).then((response) => {
  storeTokensInSession(req, response);
  return response;
});

const getAccessTokenByRefreshToken = req => axiosBimsync(
  {
    method: 'post',
    url: '/oauth2/token',
    headers: tokenHeaders,
    data: qs.stringify({
      grant_type: 'refresh_token',
      client_id: config.bimsync.auth.client_id,
      client_secret: config.bimsync.auth.client_secret,
      refresh_token: req.session.refreshToken
    })
  }
).then((res) => {
  storeTokensInSession(req, res);
  return res;
});

exports.initCodeFlow = initCodeFlow;
exports.getAccessTokenByRefreshToken = getAccessTokenByRefreshToken;
exports.getAccessTokenByCode = getAccessTokenByCode;
