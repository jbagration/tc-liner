import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FloorMap: React.FC<{ floorNumber: number }> = ({ floorNumber }) => {
  const map = useMap();

  const onMouseOver = (e: any) => {
    console.log('Mouse over event:', e);
  };

  const onMouseOut = (e: any) => {
    console.log('Mouse out event:', e);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      L.imageOverlay(`/map-${floorNumber}.svg`, [[0, 0], [100, 100]])
        .addTo(map)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut);
    }

    return () => {
      if (typeof window !== 'undefined') {
        const L = require('leaflet');
      }
    };
  }, [floorNumber, map]);

  return null;
};

export default FloorMap;
