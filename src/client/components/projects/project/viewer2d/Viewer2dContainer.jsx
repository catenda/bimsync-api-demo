/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from '../../../loader/Loader';
import { fetchViewer2dToken } from '../../../../api/app-api';
import './Viewer2dContainer.module.scss';
import { Viewer2D } from '../../../../viewer/Viewer2D';

export const Viewer2dContainer = observer(({ store }) => {
  const match = useRouteMatch();

  const { selectedObjectIds, viewer2dScriptLoaded } = store;
  const { projectId } = match.params;
  const viewer2dRef = useRef(null);
  const viewer = useRef(null);
  const [viewerTokenUrl, setViewerTokenUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchViewer2dToken(projectId).then((viewer2dUrl) => {
      setViewerTokenUrl(viewer2dUrl);
    });
  }, []);

  useEffect(() => {
    if (viewer.current) {
      viewer.current.unselect(); // Deselect all
      if (selectedObjectIds && selectedObjectIds.length) {
        viewer.current.select(selectedObjectIds); // Select selected
      }
    }
  }, [selectedObjectIds]);

  const onSelect = (event, location, id) => {
    if (id) {
      setTimeout(() => { // selected will return previously selected items if run without timeout...
        const selected = viewer.current.getSelected();
        store.setSelectedObjectIds(selected);
      }, 1);
    } else {
      store.setSelectedObjectIds([]);
    }
  };

  useLayoutEffect(() => {
    if (viewer2dScriptLoaded && !viewer.current && viewer2dRef.current) {
      viewer.current = new Viewer2D(viewer2dRef.current, onSelect);
    }
  }, [viewer2dScriptLoaded, viewer.current, viewer2dRef.current]);

  useEffect(() => {
    if (viewer.current && viewerTokenUrl) {
      setLoading(true);
      viewer.current.loadUrl(viewerTokenUrl, () => {
        setLoading(false);
      });
    }
  }, [viewerTokenUrl, viewer.current]);

  const showLoader = loading || !viewer2dScriptLoaded;

  return (
    <div id="viewer-2d-container" tabIndex="-1">
      {showLoader && <Loader /> }
      <div ref={viewer2dRef} id="viewer-2d"></div>
    </div>
  );
});
