/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const axios = require('axios').default;
const config = require('../config')();

const { baseUrl } = config.bimsync;

const axiosBimsync = axios.create({
  baseURL: baseUrl
});

exports.axiosBimsync = axiosBimsync;
