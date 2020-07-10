/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@material-ui/core';
import styles from './SignedOut.module.scss';

export const SignedOut = () => (
  <div className={styles.container}>
    <Button
      component="a"
      href="/api/init-auth-flow"
      color="default"
      variant="contained"
      size="large"
    >
      Sign back in!
    </Button>
  </div>
);
