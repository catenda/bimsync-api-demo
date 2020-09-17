/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { initViewer3dSingleProduct } from '../viewer3d/viewer-3d';
import { Loader } from '../../../loader/Loader';
import styles from './DetailsViewer.module.scss';

export const DetailsViewer = observer(({ store, className, selectedObjectId }) => {
  const viewerRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedObjectId && viewerRef?.current) {
      window.jQuery(viewerRef.current).on('viewer.load', () => {
        setLoading(false);
      });
      setLoading(true);
      initViewer3dSingleProduct(store, viewerRef.current, store.viewer3dTokenUrl, selectedObjectId);
    }
  }, [viewerRef?.current]);

  useEffect(() => () => {
    if (viewerRef?.current) {
      window.jQuery(viewerRef.current).viewer?.('dispose');
    }
  }, []); // Dispose WebGL context and release memory on unmount.

  return (
    <div className={className}>
      {loading && <Loader />}
      <div ref={viewerRef} className={styles.detailsViewer}></div>
    </div>
  );
});
