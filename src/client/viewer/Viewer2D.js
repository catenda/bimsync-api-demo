/**
 * Copyright (c) Catenda AS.
 *
 * This source code is licensed under the ISC license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Viewer2D {
  viewer2d;

  constructor(element, onClick) {
    this.viewer2d = window.jQuery(element);
    this.initialize(onClick);
  }

  initialize(onClick) {
    console.log('Initialize Viewer 2D'); // eslint-disable-line no-console
    if (onClick) {
      this.viewer2d.off('viewer2d.click').on('viewer2d.click', onClick);
    }
  }

  loadUrl(tokenUrl, loadedCallback) {
    const onLoad = () => {
      this.viewer2d.off('loaded', onLoad);
      loadedCallback?.();
    };

    this.viewer2d.on('loaded', onLoad);
    this.viewer2d.viewer2d('loadUrl', tokenUrl);
  }

  getSelected() {
    return this.viewer2d.viewer2d('getSelected');
  }

  select(ids) {
    this.viewer2d.viewer2d('select', ids);
  }

  unselect(ids) {
    this.viewer2d.viewer2d('unselect', ids);
  }
}
