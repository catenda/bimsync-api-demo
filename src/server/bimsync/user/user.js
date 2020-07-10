/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getCurrentUser = req => axiosBimsync({
  method: 'get',
  url: '/v2/user',
  headers: {
    Authorization: `Bearer ${req.session.accessToken}`,
    'Content-Type': 'application/json'
  },
  clientRequest: req
});

exports.getCurrentUser = getCurrentUser;
