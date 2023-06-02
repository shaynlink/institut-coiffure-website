import { useRef, useEffect, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
/* @ts-ignore eslint-disable-line import/no-webpack-loader-syntax */
import mapboxgl from '!mapbox-gl';
import { ThemeContext } from '@/lib/ThemeContext';

// Constant
const CENTER: [number, number] = [-0.5739762, 44.8112354];
const ZOOM: number = 13;
const PITCH: number = 0;

interface MapsProps {
  forwardClassname: string;
  zoom?: number;
  pitch?: number;
}

const mapsStyle = {
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10'
}

export default function Maps({ forwardClassname, zoom, pitch }: MapsProps) {
  const theme = useContext(ThemeContext);
  const mapContainer = useRef(null);
  const map = useRef(null);

  if (!!process.env.NEXT_PUBLIC_MAPS_KEY) {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPS_KEY as string;
  } else throw new Error('Missing access token for mapboxgl');

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current, // container ID
      style: mapsStyle['dark'], // style URL
      center: CENTER, // starting position [lng, lat]
      zoom: zoom ?? ZOOM, // starting zoom
      pitch: pitch ?? PITCH, // starting pitch
      testMode: process.env.NODE_ENV != 'production',
      touchPitch: true,
      scrollZoom: true
    });

    new mapboxgl.Marker().setLngLat(CENTER).addTo(map.current);

    function handlerError(response: mapboxgl.ErrorEvent & mapboxgl.EventData) {
      console.error('mapboxgl error:', response);
      window.createNotif(
        '<span class="material-symbols-outlined" style="margin-right: 1rem">warning</span> Mapboxgl error: ' + response.error.message,
        ['black', '#EA4A0A'],
        5000,
        {
          contentStyle: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      )
    }

    /* @ts-ignore */
    map.current.on('error', handlerError);

    return () => {
      /* @ts-ignore */
      map.current.off('error', handlerError);
    }
  });

  return (
      <div ref={mapContainer} className={forwardClassname} />
  )
}
