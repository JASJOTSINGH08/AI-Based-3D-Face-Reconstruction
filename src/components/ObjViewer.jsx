import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const ObjViewer = ({ objFile }) => {
  const objRef = useRef();
  const obj = useLoader(OBJLoader, objFile);

  useEffect(() => {
    objRef.current = obj;
  }, [obj]);

  return <primitive object={obj} scale={1.5} />;
};

export default ObjViewer;
