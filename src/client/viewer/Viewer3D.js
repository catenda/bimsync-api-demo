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
      if (loadedCallback) {
        loadedCallback();
      }
    };
    this.viewer3d.on('viewer.load', onLoad);
    this.viewer3d.viewer('loadUrl', viewer3dUrl);
  }

  select(selected) {
    this.viewer3d.viewer('select', selected);
  }

  resize() {
    this.viewer3d.viewer('resize');
  }

  dispose() {
    if (this.viewer3d) {
      this.viewer3d.viewer('dispose');
    }
  }
}
