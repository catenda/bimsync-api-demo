/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { CircularProgress, Divider, IconButton, Drawer, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useRouteMatch } from 'react-router-dom';
import { fetchProductDetails } from '../../../../api/app-api';
import { DetailsViewer } from './DetailsViewer';
import styles from './DetailsPanel.module.scss';

export const DetailsPanel = observer(({ store, className }) => {
  const match = useRouteMatch();
  const { projectId } = match.params;
  const { selectedObjectId, detailsPanelOpen } = store;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrawerClose = () => {
    store.setDetailsPanelOpen(false);
  };

  useEffect(() => {
    if (selectedObjectId && detailsPanelOpen) {
      setLoading(true);
      fetchProductDetails(store, projectId, selectedObjectId).then((res) => {
        setDetails(res);
        setLoading(false);
      });
    }
  }, [selectedObjectId, detailsPanelOpen]);

  return (
    <Drawer
      className={styles.detailsPanel}
      variant="persistent"
      anchor="right"
      open={detailsPanelOpen}
      PaperProps={{ className }}
    >
      <div className={styles.detailsPanelHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Product details
        </Typography>
      </div>
      <Divider />
      {!loading && details && (
        <div className={styles.detailsPanelContent}>
          <h3 className={styles.header}>
            {details.ifcType}
          </h3>
          <div className={styles.row}>
            <div><b>Name</b></div>
            <div>{details.attributes?.Name?.value}</div>
          </div>
          <div className={styles.row}>
            <div><b>GlobalId</b></div>
            <div>{details.attributes?.GlobalId?.value}</div>
          </div>
          <DetailsViewer store={store} className={styles.viewer3D} selectedObjectId={selectedObjectId} />
        </div>
      )}
      {loading && (
        <div className={styles.detailsPanelLoaderContainer}>
          <CircularProgress size={30} />
        </div>
      )}
    </Drawer>
  );
});
