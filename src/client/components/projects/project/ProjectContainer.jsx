/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import { fetchSpaces } from '../../../api/app-api';
import { BimsyncLogo } from '../../bimsync-logo/BimsyncLogo';
import { DetailsPanel } from './details-panel/DetailsPanel';
import { Viewer2dContainer } from './viewer2d/Viewer2dContainer';
import { Viewer3dContainer } from './viewer3d/Viewer3dContainer';
import styles from './ProjectContainer.module.scss';

export const ProjectContainer = observer(({ store }) => {
  const match = useRouteMatch();
  const { projectId } = match.params;
  const { spaces } = store;
  const viewer3dRef = useRef(null);

  useEffect(() => {
    if (!spaces?.length) {
      fetchSpaces(store, projectId);
    }
  }, [projectId]);

  useEffect(() => {
    store.setCurrentProjectId(projectId);
  }, [projectId]);

  const resizeViewer = () => {
    window.jQuery(viewer3dRef?.current)?.viewer('resize');
  };

  return (
    <div className={styles.mainContainer}>
      <SplitPane split="vertical" minSize={320} defaultSize="50%" onDragFinished={resizeViewer}>
        <Viewer2dContainer store={store} />
        <Viewer3dContainer ref={viewer3dRef} store={store} />
      </SplitPane>
      <DetailsPanel store={store} className={styles.detailsPanel} />
      <a href="https://catenda.no/products/api" className={styles.bimsyncLogo}>
        <BimsyncLogo />
      </a>
    </div>
  );
});
