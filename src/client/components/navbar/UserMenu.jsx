/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { IconButton, Avatar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { observer } from 'mobx-react';
import { fetchUser, signOut } from '../../api/app-api';
import styles from './Navbar.module.scss';

export const UserMenu = observer(({ store }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = store;

  useEffect(() => {
    if (!user) {
      fetchUser(store);
    }
  }, [user]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSignOut = () => {
    signOut();
  };

  const open = !!anchorEl;
  if (!user) {
    return null;
  }

  return (
    <div className={styles.user}>
      <IconButton
        aria-owns={open ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className={styles.userButton}
        title={user.name}
      >
        {user.avatarUrl ?
          <Avatar alt={user.name} src={`${user.avatarUrl}?size=80`} className={styles.userIcon} />
          :
          <AccountCircle className={styles.userIcon} />
        }
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={onSignOut}>Sign out</MenuItem>
      </Menu>
    </div>
  );
});
