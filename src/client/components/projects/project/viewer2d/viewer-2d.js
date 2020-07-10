/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { State } from '../../../../utils/viewer-state';

export const initViewer2D = (store, viewerElement, tokenUrl) => {
  console.log('Initialize Viewer 2D'); // eslint-disable-line no-console
  const $viewer2d = window.jQuery(viewerElement);
  store.setViewer2dState(State.LOADING);

  window.bimsync.loadViewer2d();

  window.bimsync.setOnViewer2dLoadCallback(() => {
    $viewer2d.off('loaded').on('loaded', () => {
      console.log('2D Viewer loaded!'); // eslint-disable-line no-console
      store.setViewer2dState(State.LOADED);

      $viewer2d.off('viewer2d.click').on('viewer2d.click', (event, location, id) => {
        if (id) {
          setTimeout(() => { // selected will return previously selected items if run without timeout...
            const selected = $viewer2d.viewer2d('getSelected');
            store.setSelectedObjectIds(selected);
          }, 1);
        } else {
          store.setSelectedObjectIds([]);
        }
      });
    });
    $viewer2d.viewer2d('loadUrl', tokenUrl);
  });
};
