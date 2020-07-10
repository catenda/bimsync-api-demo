/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getProjectImage = (req, projectId) => axiosBimsync({
  method: 'GET',
  url: `/v2/projects/${projectId}/image`,
  headers: {
    Authorization: `Bearer ${req.session.accessToken}`
  },
  responseType: 'arraybuffer'
});

exports.getProjectImage = getProjectImage;
