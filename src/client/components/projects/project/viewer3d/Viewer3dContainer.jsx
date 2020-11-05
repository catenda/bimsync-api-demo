/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useLayoutEffect } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { Toolbar } from './Toolbar';
import { Loader } from '../../../loader/Loader';
import { State } from '../../../../utils/viewer-state';
import { fetchViewer3dToken } from '../../../../api/app-api';
import { initViewer3D, viewer3dToggleSpaces } from './viewer-3d';
import styles from './Viewer3dContainer.module.scss';

export const Viewer3dContainer = observer(React.forwardRef(({ store }, ref) => {
  const match = useRouteMatch();
  const { projectId } = match.params;
  const selected = store.selectedObjectIds;
  const { viewer3dState, viewer3dDisplayMode } = store;

  useEffect(() => () => {
    if (ref?.current) {
      window.jQuery(ref.current).viewer?.('dispose');
    }
  }, []); // Dispose WebGL context and release memory on unmount.

  useEffect(() => {
    if (viewer3dState === State.LOADED) {
      window.jQuery(ref.current).viewer('select', selected);
    }
  }, [selected]);

  useEffect(() => {
    if (viewer3dState === State.LOADED) {
      viewer3dToggleSpaces(window.jQuery(ref.current), store.spaces, viewer3dDisplayMode);
    }
  }, [viewer3dDisplayMode]);

  useLayoutEffect(() => {
    if (viewer3dState === State.NOT_INITIALIZED) {
      fetchViewer3dToken(projectId).then(((viewer3dUrl) => {
        store.setViewer3dTokenUrl(viewer3dUrl);
        initViewer3D(store, ref.current, viewer3dUrl);
      }));
    }
  }, [viewer3dState]);

  const showLoader = viewer3dState !== State.LOADED;
  return (
    <div id="viewer-3d-container" className={styles.viewer3DContainer} tabIndex="-1">
      {showLoader && <Loader /> }
      <div ref={ref} id="viewer-3d" className={styles.viewer3D}></div>
      <Toolbar store={store} className={styles.viewer3DToolbar} />
    </div>
  );
}));
