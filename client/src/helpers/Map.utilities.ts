import { defaultCurrentLocation, MAP_ID } from '../../constants';
import type { Rally } from '../types/Rally.interface';
import { GOOGLE_MAPS_API_KEY } from '../../constants';
import { Loader } from '@googlemaps/js-api-loader';
import { reactive, ref, shallowRef, type Reactive } from 'vue';
import { rallyAPI } from './Rally.api';

export const loader: Loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

const map = shallowRef<google.maps.Map | null>(null);
const currentLocation = ref<google.maps.LatLngLiteral | null>(null);
const currentBounds = ref<google.maps.LatLngBounds | null>(null);

export function useMap() {
  const initMap = async (mapEl: HTMLElement) => {
    const { Map } = await loader.importLibrary('maps');
    currentLocation.value = await getCurrentLocation();

    map.value = new Map(mapEl, {
      zoom: 12,
      center: currentLocation.value,
      mapId: MAP_ID
    });
  };

  return {
    map,
    currentLocation,
    currentBounds,
    initMap
  }
}

const activeRally = ref<Rally | null>(null);
const rallies = reactive<Rally[]>([]);
const rallyError = ref<unknown>(null);

export function useRallies() {
  const fetchRallies = async (bounds: Array<number[]>) => {
    const [error, data] = await rallyAPI.getRalliesWithinBounds(bounds);
    rallies.splice(0, rallies.length, ...data);
    rallyError.value = error;
  };

  const setActiveRally = (rally: Rally) => {
    activeRally.value = rally;
  };

  return {
    activeRally,
    rallies,
    rallyError,
    setActiveRally,
    fetchRallies
  }
}

export async function hideAndShowMarkers(
  map: google.maps.Map,
  markers: google.maps.marker.AdvancedMarkerElement[],
  rallies: Reactive<Rally[]>
) {
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");

  // Hide markers
  for (let i = 0; i < markers.length; i++) {
    markers[i].map = null;
  }
  // Delete all markers
  markers.length = 0;

  // Create and show markers
  rallies.forEach((rally: Rally) => {
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