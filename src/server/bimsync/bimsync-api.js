/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { initCodeFlow, getAccessTokenByCode, getAccessTokenByRefreshToken } = require('./authentication/authentication');
const { getViewer2dToken, getViewer3dToken } = require('./viewer/viewer');
const { getProjects } = require('./project/projects');
const { getProjectImage } = require('./project/project-image');
const { getSpaces } = require('./ifc/spaces');
const { getProduct } = require('./ifc/product');
const { getCurrentUser } = require('./user/user');

const bimsyncApi = {
  initCodeFlow,
  getAccessTokenByCode,
  getAccessTokenByRefreshToken,
  getCurrentUser,
  getProjects,
  getProjectImage,
  getSpaces,
  getProduct,
  getViewer2dToken,
  getViewer3dToken
};

exports.bimsyncApi = bimsyncApi;
