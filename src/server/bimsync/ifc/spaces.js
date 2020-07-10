/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getSpaces = (req, projectId, limit = 1000) => axiosBimsync(
  {
    method: 'GET',
    url: `/v2/projects/${projectId}/ifc/products?ifcType=IfcSpace&pageSize=${limit}`,
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
      'Content-Type': 'application/json'
    }
  }
);

exports.getSpaces = getSpaces;
