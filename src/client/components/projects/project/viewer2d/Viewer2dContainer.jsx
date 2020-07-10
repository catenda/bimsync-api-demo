/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from '../../../loader/Loader';
import { State } from '../../../../utils/viewer-state';
import { fetchViewer2dToken } from '../../../../api/app-api';
import { initViewer2D } from './viewer-2d';
import './Viewer2dContainer.module.scss';

export const Viewer2dContainer = observer(({ store }) => {
  const match = useRouteMatch();

  const { selectedObjectIds, viewer2dState } = store;
  const { projectId } = match.params;
  const viewer2dRef = useRef(null);

  useEffect(() => {
    if (viewer2dState === State.LOADED) {
      window.jQuery(viewer2dRef.current).viewer2d('unselect', null); // Deselect all
      if (selectedObjectIds && selectedObjectIds.length) {
        window.jQuery(viewer2dRef.current).viewer2d('select', selectedObjectIds); // Select selected
      }
    }
  }, [selectedObjectIds]);

  useLayoutEffect(() => {
    if (viewer2dState === State.NOT_INITIALIZED) {
      fetchViewer2dToken(projectId).then((viewer2dUrl) => {
        initViewer2D(store, viewer2dRef.current, viewer2dUrl);
      });
    }
  }, [viewer2dState]);

  const showLoader = viewer2dState !== State.LOADED;

  return (
    <div id="viewer-2d-container" tabIndex="-1">
      {showLoader && <Loader /> }
      <div ref={viewer2dRef} id="viewer-2d"></div>
    </div>
  );
});
