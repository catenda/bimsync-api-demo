/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 100;

const axiosClient = axios.create();

// Add interceptor to retry failed requests
axiosClient.interceptors.response.use(response => response, (error) => {
  const originalRequest = error.config;
  const retries = originalRequest?._retries || 0;

  // If we get 401 response: retry request since it may fail due to race conditions when trying to refresh tokens
  if (error.response && error.response.status === 401 && retries < MAX_RETRIES) {
    originalRequest._retries = retries + 1;
    return new Promise((resolve) => {
      setTimeout(() => resolve(axiosClient(originalRequest)), RETRY_DELAY);
    });
  }
  return Promise.reject(error);
});

const redirectToAuthOn401 = (error) => {
  if (error.response?.status === 401) {
    window.location.href = '/api/init-auth-flow';
  }
};

export const signOut = () => {
  axiosClient('/api/sign-out')
    .then(() => {
      window.location.href = '/signed-out';
    })
    .catch(e => console.log('error', e)); // eslint-disable-line no-console
};

export const fetchUser = (store) => {
  axiosClient('/api/user')
    .then((res) => {
      store.setUser(res.data.user);
    })
    .catch(redirectToAuthOn401);
};

export const fetchSpaces = (store, projectId) => {
  axiosClient(`/api/project/${projectId}/spaces`)
    .then((res) => {
      store.setSpaces(res.data);
    })
    .catch(redirectToAuthOn401);
};

export const fetchProjects = (store) => {
  axiosClient('/api/projects')
    .then((res) => {
      store.setProjects(res.data);
    })
    .catch(redirectToAuthOn401);
};

export const fetchProductDetails = (store, projectId, objectId) => (
  axiosClient(`/api/projects/${projectId}/ifc/products/${objectId}`)
    .then(res => res.data)
    .catch(redirectToAuthOn401)
);

export const projectImageUrl = projectId => `/api/projects/${projectId}/image`;

export const fetchViewer2dToken = projectId => (
  axiosClient(`/api/project/${projectId}/viewer-2d-token`)
    .then(res => res.data.viewer2dUrl)
    .catch(redirectToAuthOn401)
);

export const fetchViewer3dToken = projectId => (
  axiosClient(`/api/project/${projectId}/viewer-3d-token`)
    .then(res => res.data.viewer3dUrl)
    .catch(redirectToAuthOn401)
);
