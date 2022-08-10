/* eslint-disable no-console */
import React, { useState } from 'react';
import { getCode, getName, getData } from 'country-list';
import Map from './Map';

const userId = 1;

export default function App() {
  const [mapData, setMapData] = useState({
    CN: 10,
    US: 10,
    JP: 10,
  });

  const handleClick = (e, countryCode) => {
    console.log(countryCode);
    // popup modal
    // if country code exists in mapData,
    // show the photos & description as a popup form
    // otherwise
    // just show the create new post button
  };

  return (
    <div>
      <Map mapData={mapData} handleClick={handleClick} />
    </div>
  );
}
