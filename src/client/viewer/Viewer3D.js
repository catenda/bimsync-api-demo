/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Viewer3dToggleSpaceModes } from './viewer-3d-spaces-mode';

const defaultOptions = {
  viewer3d: {
    translucentOpacity: 0.2,
    enableTouch: true,
    enableClippingPlaneWidget: true,
    selectedColor: '#60b5ff'
  },
  viewerUI: {
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
  }
};

export class Viewer3D {
  viewer3d;

  constructor(element, viewerOptions, onSelect, viewerUiOptions) {
    this.viewer3d = window.jQuery(element);
    this.initialize(viewerOptions, onSelect, viewerUiOptions);
  }

  initialize(options, onSelect, viewerUiOptions) {
    console.log('Initialize Viewer 3D'); // eslint-disable-line no-console
    this.viewer3d.viewer(options || defaultOptions.viewer3d);
    if (viewerUiOptions !== null) {
      this.viewer3d.viewerUI(viewerUiOptions || defaultOptions.viewerUI);
    }
    if (typeof onSelect === 'function') {
      this.viewer3d.on('viewer.select', onSelect);
    }
  }

  loadUrl(viewer3dUrl, loadedCallback) {
    const onLoad = () => {
      this.viewer3d.off('viewer.load', onLoad);
      loadedCallback?.();
    };
    this.viewer3d.on('viewer.load', onLoad);
    this.viewer3d.viewer('loadUrl', viewer3dUrl);
  }

  loadObjectsFromUrl(viewer3dUrl, objectId, loadedCallback) {
    const onLoad = () => {
      this.viewer3d.off('viewer.load', onLoad);
      loadedCallback?.();
    };
    this.viewer3d.on('viewer.load', onLoad);
    this.viewer3d.viewer('loadUrl', viewer3dUrl, {
      objectId
    });
  }

  select(selected) {
    this.viewer3d.viewer('select', selected);
  }

  toggleSpaces(spaces, mode) {
    switch (mode) {
      case Viewer3dToggleSpaceModes.SHOW_ALL:
        this.viewer3d.viewer('showAll');
        break;
      case Viewer3dToggleSpaceModes.SPACES_ONLY:
        this.viewer3d.viewer('hideAll');
        this.viewer3d.viewer('show', spaces);
        break;
      case Viewer3dToggleSpaceModes.HIDE_ROOMS:
        this.viewer3d.viewer('showAll');
        this.viewer3d.viewer('hide', spaces);
        break;
      default:
        break;
    }
  }

  resize() {
    this.viewer3d.viewer('resize');
  }

  dispose() {
    this.viewer3d.viewer?.('dispose');
  }
}
