/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Typography } from '@material-ui/core';
import styles from './GitHubLink.module.scss';

export const GitHubLink = ({ className }) => (
  <a
    href="https://github.com/catenda/bimsync-api-demo"
    target="_blank"
    rel="noopener noreferrer"
    className={classNames(styles.githubLink, className)}
  >
    <GitHubIcon />
    <Typography variant="body1" color="inherit" className={styles.githubText}>
      View on GitHub
    </Typography>
  </a>
);
