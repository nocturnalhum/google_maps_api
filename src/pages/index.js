import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useMemo, useState } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import data from '../../data/Cyclists.json';

const inter = Inter({ subsets: ['latin'] });
console.log('TEST', data.features[0].properties);
export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

function Map() {
  const [year, setYear] = useState(2006);
  const center = useMemo(() => ({ lat: 43.66412, lng: -79.39844 }), []);
  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName='map-container'>
      <MarkerF position={center} />
      <MarkerF position={{ lat: 43.66612, lng: -79.39874 }}></MarkerF>
      {data.features.map((point) => {
        const [lng, lat] = point.geometry.coordinates;
        if (point.properties.YEAR === year) {
          return (
            <MarkerF
              key={point.properties.INDEX_}
              position={{ lat: lat, lng: lng }}
            />
          );
        }
      })}
    </GoogleMap>
  );
}
