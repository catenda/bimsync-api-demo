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

export const App = ({ store }) => (
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
