/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { State } from '../../../../utils/viewer-state';

export const Viewer3dToggleSpaceModes = {
  SHOW_ALL: 'Show all',
  SPACES_ONLY: 'Rooms only',
  HIDE_ROOMS: 'Hide rooms'
};

export const initViewer3D = (store, element, tokenUrl) => {
  console.log('Initialize Viewer 3D'); // eslint-disable-line no-console
  const $viewer3d = window.jQuery(element);
  store.setViewer3dState(State.LOADING);
  window.bimsync.load(['viewer-ui']);

  window.bimsync.setOnLoadCallback(() => {
    $viewer3d.viewer({
      translucentOpacity: 0.2,
      enableTouch: true,
      enableClippingPlaneWidget: true,
      selectedColor: '#60b5ff'
    });
    $viewer3d.viewerUI({
      enableJoystick: true,
      enableTouch: true,
      enableKeyboard: true,
      joystickHidden: true,
      joystickColor: 'lightgreen',
      joystickPosition: 'bottom-center',
      joystickBorderOffset: '-40px',
      enableContextMenu: true,
      viewer2dId: 'viewer-2d',
      enableViewer2dIntegration: true,
      lockStoreyMode: false,
      showViewer2dStoreySelect: true,
      showViewer2dLockedNavigationToggle: false
    });
    $viewer3d.on('viewer.load', () => {
      store.setViewer3dState(State.LOADED);
    });
    $viewer3d.viewer('loadUrl', tokenUrl);
    $viewer3d.on('viewer.select', (e, selected) => {
      store.setSelectedObjectIds(selected);
    });
  });
};

export const initViewer3dSingleProduct = (store, element, tokenUrl, objectId) => {
  const $viewer3dDetails = window.jQuery(element);

  window.bimsync.setOnLoadCallback(() => {
    $viewer3dDetails.viewer({
      enableTouch: true
    });
    $viewer3dDetails.viewer('loadUrl', tokenUrl, {
      objectId
    });
  });
};

export const viewer3dToggleSpaces = (element, spaces, mode) => {
  const $viewer = window.jQuery(element);
  switch (mode) {
    case Viewer3dToggleSpaceModes.SHOW_ALL:
      $viewer.viewer('showAll');
      break;
    case Viewer3dToggleSpaceModes.SPACES_ONLY:
      $viewer.viewer('hideAll');
      $viewer.viewer('show', spaces);
      break;
    case Viewer3dToggleSpaceModes.HIDE_ROOMS:
      $viewer.viewer('showAll');
      $viewer.viewer('hide', spaces);
      break;
    default:
      break;
  }
};

export const resizeViewer3D = (viewerElement) => {
  window.jQuery(viewerElement).viewer('resize');
};
