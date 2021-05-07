/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { Toolbar } from './Toolbar';
import { Loader } from '../../../loader/Loader';
import { fetchViewer3dToken } from '../../../../api/app-api';
import { Viewer3D } from '../../../../viewer/Viewer3D';
import styles from './Viewer3dContainer.module.scss';

export const Viewer3dContainer = observer(React.forwardRef(({ store }, viewerElementRef) => {
  const match = useRouteMatch();
  const { projectId } = match.params;
  const { viewer3dDisplayMode, viewer3dScriptLoaded, viewer2dScriptLoaded } = store;
  const selected = store.selectedObjectIds;

  const viewer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [viewer3dTokenUrl, setViewer3dTokenUrl] = useState(null);

  useEffect(() => {
    fetchViewer3dToken(projectId).then(((viewer3dUrl) => {
      setViewer3dTokenUrl(viewer3dUrl);
    }));
    return () => {
      // Dispose WebGL context and release memory on unmount.
      viewer.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (viewer.current) {
      viewer.current.select(selected);
    }
  }, [selected]);

  useEffect(() => {
    if (viewer.current) {
      viewer.current.toggleSpaces(store.spaces, viewer3dDisplayMode);
    }
  }, [viewer3dDisplayMode]);

  const onSelect = (e, selection) => {
    store.setSelectedObjectIds(selection);
  };

  // Make sure viewer 2d script is also loaded since viewerUI depends on it
  const viewerScriptsLoaded = viewer2dScriptLoaded && viewer3dScriptLoaded;

  // Initialize Viewer3D instance
  useEffect(() => {
    if (viewerScriptsLoaded && !viewer.current && viewerElementRef.current) {
      viewer.current = new Viewer3D(viewerElementRef.current, null, onSelect);
    }
  }, [viewerScriptsLoaded, viewer.current, viewerElementRef.current]);

  // Load geometry
  useEffect(() => {
    if (viewer.current && viewer3dTokenUrl) {
      setLoading(true);
      viewer.current.loadUrl(viewer3dTokenUrl, () => {
        setLoading(false);
      });
    }
  }, [viewer3dTokenUrl, viewer.current]);

  const showLoader = !viewerScriptsLoaded || loading;
  return (
    <div id="viewer-3d-container" className={styles.viewer3DContainer} tabIndex="-1">
      {showLoader && <Loader /> }
      <div ref={viewerElementRef} id="viewer-3d" className={styles.viewer3D}></div>
      <Toolbar store={store} className={styles.viewer3DToolbar} />
    </div>
  );
}));
