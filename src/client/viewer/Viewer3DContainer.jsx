import React, { useEffect, useRef, useState } from 'react';
import { fetchViewer3dToken } from '../api/app-api';
import { Viewer3D } from './Viewer3D';

export const Viewer3DContainer = React.forwardRef(({ projectId, viewer3dScriptLoaded }, viewerElementRef) => {
  const viewer = useRef(null);
  const [viewer3dTokenUrl, setViewer3dTokenUrl] = useState(null);

  useEffect(() => {
    fetchViewer3dToken(projectId).then(((viewer3dUrl) => {
      setViewer3dTokenUrl(viewer3dUrl);
    }));
    return () => {
      // Dispose WebGL context and release memory on unmount.
      if (viewer.current) {
        viewer.current.dispose();
      }
    };
  }, []);

  const onSelect = (e, selection) => {
    console.log(selection);
  };

  // Initialize Viewer3D instance
  useEffect(() => {
    if (viewer3dScriptLoaded && !viewer.current && viewerElementRef.current) {
      viewer.current = new Viewer3D(viewerElementRef.current, null, onSelect);
    }
  }, [viewer3dScriptLoaded, viewer.current, viewerElementRef.current]);

  // Load geometry
  useEffect(() => {
    if (viewer.current && viewer3dTokenUrl) {
      console.log(`loading ${viewer3dTokenUrl}`);
      viewer.current.loadUrl(viewer3dTokenUrl, () => {
        console.log('model loaded');
      });
    }
  }, [viewer3dTokenUrl, viewer.current]);

  return (
    <div id="viewer-3d-container" tabIndex="-1" style={{ width: '300px', height: '300px', border: '1px solid #000' }}>
      <div ref={viewerElementRef} id="viewer-3d" style={{ width: '300px', height: '300px', border: '1px solid #000' }}></div>
    </div>
  );
});
