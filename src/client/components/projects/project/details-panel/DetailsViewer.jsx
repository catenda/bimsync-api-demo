/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { Loader } from '../../../loader/Loader';
import { Viewer3D } from '../../../../viewer/Viewer3D';
import styles from './DetailsViewer.module.scss';
import { fetchViewer3dToken } from '../../../../api/app-api';

export const DetailsViewer = observer(({ store, projectId, className, selectedObjectId }) => {
  const viewerRef = useRef();
  const viewer = useRef();
  const [loading, setLoading] = useState(false);
  const { viewer3dScriptLoaded } = store;

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
    if (viewer3dScriptLoaded && !viewer.current && viewerRef.current) {
      viewer.current = new Viewer3D(viewerRef.current, {
        enableTouch: true
      }, null, null);
    }
  }, [viewer3dScriptLoaded, viewer.current, viewerRef.current]);

  useEffect(() => {
    if (viewer.current && viewer3dTokenUrl) {
      setLoading(true);
      viewer.current.loadObjectsFromUrl(viewer3dTokenUrl, selectedObjectId, () => {
        setLoading(false);
      });
    }
  }, [viewer3dTokenUrl, viewer.current]);

  useEffect(() => {
    if (selectedObjectId && viewerRef?.current) {
      setLoading(true);
    }
  }, [viewerRef?.current]);

  return (
    <div className={className}>
      {loading && <Loader />}
      <div ref={viewerRef} className={styles.detailsViewer}></div>
    </div>
  );
});
