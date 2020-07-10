/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getProjects = req => axiosBimsync(
  {
    method: 'GET',
    url: '/v2/projects',
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
      'Content-Type': 'application/json'
    },
    clientRequest: req
  }
);

exports.getProjects = getProjects;
