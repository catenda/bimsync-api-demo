/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Link, withRouter, useLocation } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { observer } from 'mobx-react';
import { fetchProjects } from '../../api/app-api';
import { UserMenu } from './UserMenu';
import styles from './Navbar.module.scss';
import { GitHubLink } from './GitHubLink';

export const Navbar = withRouter(observer(({ store }) => {
  const { projects, project } = store;
  const location = useLocation();
  const isSignedOutView = location.pathname === '/signed-out';

  useEffect(() => {
    if (!projects && !isSignedOutView) {
      fetchProjects(store);
    }
  }, [projects, isSignedOutView]);

  return (
    <div className={styles.navbar}>
      <AppBar className={styles.navHeader} position="static">
        <Toolbar>
          <IconButton className={styles.navbarMenuButton} component={Link} to="/" color="inherit" aria-label="Home">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={styles.navbarTitle}>
            {`Bimsync API demo ${project ? ` - ${project.name}` : ''}`}
          </Typography>
          <GitHubLink className={styles.githubLink} />
          {!isSignedOutView && <UserMenu store={store} />}
        </Toolbar>
      </AppBar>
    </div>
  );
}));
