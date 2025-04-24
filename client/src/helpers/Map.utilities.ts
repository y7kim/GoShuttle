import { defaultCurrentLocation, MAP_ID } from '../../constants';
import type { Rally } from '../types/Rally.interface';
import { useRallyStore } from '../stores/rally';
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import { Loader } from '@googlemaps/js-api-loader';

export const loader: Loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export async function drawMap(mapEl: HTMLElement): Promise<google.maps.Map> {
  const store = useRallyStore();
  const { Map } = await loader.importLibrary('maps');

  const currentLocation: google.maps.LatLngLiteral = await getCurrentLocation();
  store.updateCurrentLocation(currentLocation);

  const map = new Map(mapEl, {
    zoom: 12,
    center: currentLocation,
    mapId: MAP_ID
  });

  return map;
};

export async function hideAndShowMarkers(
  map: google.maps.Map,
  markers: google.maps.marker.AdvancedMarkerElement[]
) {
  const store = useRallyStore();
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");

  // Hide markers
  for (let i = 0; i < markers.length; i++) {
    markers[i].map = null;
  }
  // Delete all markers
  markers.length = 0;

  // Create and show markers
  store.rallies.forEach((rally: Rally) => {
    const lat: number = rally.location.coordinates[1];
    const lng: number = rally.location.coordinates[0];

    markers.push(
      new AdvancedMarkerElement({
        map,
        position: {
          lat,
          lng
        }
      })
    );
  });
}

export function convertBoundsToPolygon(bounds: google.maps.LatLngBounds): Array<number[]> {
  const NE = bounds.getNorthEast();
  const SW = bounds.getSouthWest();

  return [
    [NE.lng(), SW.lat()],
    [NE.lng(), NE.lat()],
    [SW.lng(), NE.lat()],
    [SW.lng(), SW.lat()],
    [NE.lng(), SW.lat()]
  ];
}

async function getCurrentLocation(): Promise<google.maps.LatLngLiteral> {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((location) => {
      resolve({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      });
    }, () => {
      resolve(defaultCurrentLocation);
    });
  });
}