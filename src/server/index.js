/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config')();
const { bimsyncApi } = require('./bimsync/bimsync-api');
const { setupAxiosInterceptors } = require('./bimsync/axios-interceptors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11) choke on 204
};

console.log(`Environment: ${config.env}`); // eslint-disable-line no-console
console.log(`Redirect url: ${config.bimsync.auth.redirect_uri}`); // eslint-disable-line no-console

setupAxiosInterceptors();

const PORT = config.server.port;

const app = express();
app.use(cors(corsOptions));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`${res.statusCode} - ${req.path} - ${new Date().toString()}`); // eslint-disable-line no-console
  });
  next();
});

// Note: The default express-session storage, MemoryStore, is purposely not designed for a production environment
// Ref https://www.npmjs.com/package/express-session#sessionoptions
app.use(session({
  name: 'bs-demo-session',
  secret: config.session_secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000,
    httpOnly: true,
    secure: config.env !== 'development'
  }
}));

app.get('/api/sign-out', (req, res) => {
  req.session.accessToken = null;
  req.session.refreshToken = null;
  res.status(204).send();
});

app.get('/api/user', (req, res) => {
  bimsyncApi.getCurrentUser(req).then((response) => {
    const { avatarUrl, name } = response.data;
    res.json({ user: { avatarUrl, name } });
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/init-auth-flow', (req, res) => {
  bimsyncApi.initCodeFlow().then((response) => {
    res.redirect(response.request.res.responseUrl);
  });
});

app.get('/auth', (req, res) => {
  bimsyncApi.getAccessTokenByCode(req.query.code, req).then(() => {
    if (config.env === 'development') {
      res.redirect('http://localhost:3000');
    } else {
      res.redirect('/');
    }
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/projects', (req, res) => {
  bimsyncApi.getProjects(req).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/projects/:projectId/image', (req, res) => {
  const { projectId } = req.params;
  bimsyncApi.getProjectImage(req, projectId).then((response) => {
    res.type('image/jpeg');
    res.end(response.data, 'binary');
  }).catch(() => {
    res.status(404).send();
  });
});
app.get('/api/project/:projectId/viewer-2d-token', (req, res) => {
  const { projectId } = req.params;
  bimsyncApi.getViewer2dToken(projectId, req).then((response) => {
    res.json({ viewer2dUrl: response.data.url });
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/project/:projectId/viewer-3d-token', (req, res) => {
  const { projectId } = req.params;
  bimsyncApi.getViewer3dToken(projectId, req).then((response) => {
    res.json({ viewer3dUrl: response.data.url });
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/project/:projectId/spaces', (req, res) => {
  const { projectId } = req.params;
  bimsyncApi.getSpaces(req, projectId).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

app.get('/api/projects/:projectId/ifc/products/:productId', (req, res) => {
  const { projectId, productId } = req.params;
  bimsyncApi.getProduct(req, projectId, productId).then((response) => {
    res.json(response.data);
  }).catch((error) => {
    res.status(error.response.status).send();
  });
});

// Catch all to get refresh after react router update url to work
app.get('*', (req, res) => {
  res.sendFile(config.indexHtmlPath);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`)); // eslint-disable-line no-console

module.exports = app;
