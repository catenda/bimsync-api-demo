/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getViewer2dToken = (projectId, req) => axiosBimsync(
  {
    method: 'POST',
    url: `/v2/projects/${projectId}/viewer2d/token`,
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
      'Content-Type': 'application/json'
    },
    //
    // body: JSON.stringify({
    //   models: modelIds
    // }),

    clientRequest: req
  }
);

const getViewer3dToken = (projectId, req) => axiosBimsync(
  {
    method: 'POST',
    url: `/v2/projects/${projectId}/viewer3d/token`,
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({
    //   models: [modelIds...]
    // }),
    clientRequest: req
  }
);

exports.getViewer2dToken = getViewer2dToken;
exports.getViewer3dToken = getViewer3dToken;
