/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('./axios');
const { getAccessTokenByRefreshToken } = require('./authentication/authentication');

const refreshTokensAndRetryOn401 = (error, req) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    console.log('Authentication error! trying to refresh tokens.'); // eslint-disable-line no-console
    originalRequest._retry = true;
    // Try to get new access tokens using refresh token
    return getAccessTokenByRefreshToken(req).then((tokenResponse) => {
      console.log('Successfully refreshed tokens! Retrying original request...'); // eslint-disable-line no-console
      const updatedConfig = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: `Bearer ${tokenResponse.data.access_token}`
        }
      };
      return axiosBimsync(updatedConfig);
    }).catch(() => {
      console.log('Failed to refreshed tokens! Returning original error'); // eslint-disable-line no-console
      return Promise.reject(error);
    });
  }
  return Promise.reject(error);
};

const setupAxiosInterceptors = () => {
  axiosBimsync.interceptors.response.use(response => response, (error) => {
    if (error.config.clientRequest) {
      return refreshTokensAndRetryOn401(error, error.config.clientRequest);
    }
    if (error.response.status === 401) {
      console.log(`Not retrying req: ${error.request.path}`); // eslint-disable-line no-console
      console.log('Add clientRequest param to request config to automatically retry'); // eslint-disable-line no-console
    }
    return Promise.reject(error);
  });
};

exports.setupAxiosInterceptors = setupAxiosInterceptors;
