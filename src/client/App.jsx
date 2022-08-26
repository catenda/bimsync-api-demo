/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProjectsList } from './components/projects/ProjectsList';
import { ProjectContainer } from './components/projects/project/ProjectContainer';
import { Navbar } from './components/navbar/Navbar';
import { SignedOut } from './components/signed-out/SignedOut';
import styles from './App.module.scss';

const ensureViewerScriptsLoaded = (store) => {
  if (!store.viewer3dScriptsLoaded) {
    window.bimsync.setOnLoadCallback(() => {
      store.setViewer3dScriptLoaded();
    });
    window.bimsync.load(['viewer-ui']);
  }
  if (!store.viewer2dScriptsLoaded) {
    window.bimsync.setOnViewer2dLoadCallback(() => {
      store.setViewer2dScriptLoaded();
    });
    window.bimsync.loadViewer2d();
  }
};

export const App = ({ store }) => {
  ensureViewerScriptsLoaded(store);

  return (
    <Router>
      <div className={styles.mainContainer}>
        <Navbar store={store} />
        <div className={styles.contentContainer}>
          <Switch>
            <Route exact path="/">
              <ProjectsList store={store} />
            </Route>
            <Route exact path="/project/:projectId">
              <ProjectContainer store={store} />
            </Route>
            <Route exact path="/signed-out">
              <SignedOut />
            </Route>
            <Route>
              <div>NOT FOUND</div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};
