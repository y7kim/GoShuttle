import { loader } from './loader';
import { MAP_ID } from '../../api-keys.const';

export async function drawMap(mapEl: HTMLElement): Promise<google.maps.Map> {
  const { Map } = await loader.importLibrary('maps');
  const currentLocation: google.maps.LatLngLiteral | null = await getCurrentLocation();

  const map = new Map(mapEl, {
    zoom: 12,
    center: currentLocation,
    mapId: MAP_ID
  });

  return map;
};

async function getCurrentLocation(): Promise<google.maps.LatLngLiteral | null> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        resolve({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        });
      });
    } else {
      reject(null);
    }
  });
}