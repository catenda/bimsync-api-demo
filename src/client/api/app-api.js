import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 100;

const axiosClient = axios.create();

// Add interceptor to retry failed requests
axiosClient.interceptors.response.use(response => response, (error) => {
  const originalRequest = error.config;
  let retries = 0;
  if (originalRequest) {
    retries = originalRequest._retries;
  }

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
  if (error.response && error.response.status === 401) {
    window.location.href = '/api/init-auth-flow';
  }
};

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
