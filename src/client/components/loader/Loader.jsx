/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './Loader.module.scss';

export const Loader = () => (
  <div className={styles.loader}>
    <CircularProgress size={60} />
  </div>
);
