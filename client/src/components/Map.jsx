import React from 'react';
import { VectorMap } from '@react-jvectormap/core';
import worldMill from '@react-jvectormap/world/dist/worldMill.json';

export default function Map({ mapData, handleClick }) {
  return (
    <div style={{ width: '100vh', height: '100vh' }}>
      <VectorMap
        map={worldMill}
        backgroundColor="transparent"
        zoomOnScroll={false}
        containerStyle={{
          width: '100%',
          height: '520px',
        }}
        onRegionClick={handleClick}
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: '#D0D6B5',
            'fill-opacity': 0.5,
            stroke: 'black',
            'stroke-width': 0,
            'stroke-opacity': 0.5,
          },
          hover: {
            'fill-opacity': 1,
            cursor: 'pointer',
          },
          selectedHover: {},
        }}
        regionsSelectable
        series={{
          regions: [
            {
              values: mapData,
              scale: ['#EE7674'],
              normalizeFunction: 'polynomial',
            },
          ],
        }}
      />
    </div>
  );
}
