/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { axiosBimsync } = require('../axios');

const getProduct = (req, projectId, productId) => axiosBimsync(
  {
    method: 'GET',
    url: `/v2/projects/${projectId}/ifc/products/${productId}`,
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`,
      'Content-Type': 'application/json'
    },
    clientRequest: req
  }
);

exports.getProduct = getProduct;
