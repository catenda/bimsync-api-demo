import React, { useEffect, useRef, useState } from 'react';
import { Viewer3DContainer } from './viewer/Viewer3DContainer';

export const App = () => {
  const [viewer3DScriptLoaded, setViewer3DScriptLoaded] = useState(false);
  const viewer3dRef = useRef(null);

  useEffect(() => {
    window.bimsync.setOnLoadCallback(() => {
      setViewer3DScriptLoaded(true);
    });
    window.bimsync.load(['viewer-ui']);
  }, []);

  return (
    <>
      <Viewer3DContainer
        ref={viewer3dRef}
        viewer3dScriptLoaded={viewer3DScriptLoaded}
        projectId="d25274480cb046b9a0b5c28d3eb63eed"
      />
    </>
  );
};
