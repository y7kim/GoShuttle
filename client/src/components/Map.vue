<script setup lang="ts">

import { Loader } from '@googlemaps/js-api-loader';
import { onMounted } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import { type Rally } from '../types/Rally.interface';
import { GOOGLE_MAPS_API_KEY, MAP_ID } from '../../api-keys.const';
import { useRallyStore } from '../stores/rally';

const loader: Loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});
const store = useRallyStore();

onMounted(async () => {
  const mapElement: HTMLElement | null = document.getElementById("map");

  if (mapElement) {
    drawMap(mapElement);
  }
});

async function drawMap(mapEl: HTMLElement) {
  const { Map } = await loader.importLibrary('maps');
  const { event } = await loader.importLibrary('core');
  const currentLocation: google.maps.LatLngLiteral | null = await getCurrentLocation();

  const map = new Map(mapEl, {
    zoom: 12,
    center: currentLocation,
    mapId: MAP_ID
  });

  event.addListener(map, 'bounds_changed', () => getRalliesWithinBounds(map));
  event.addListener(map, 'zoom_changed', () => getRalliesWithinBounds(map));
};

async function getRalliesWithinBounds(map: google.maps.Map) {
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");
  let rallies: Rally[] = [];
  let currentBounds: google.maps.LatLngBounds | undefined;

  currentBounds = map.getBounds();

  if (currentBounds) {
    rallies = await getRallies(
      convertBoundsToPolygon(currentBounds)
    );
    store.updateRallies(rallies);

    rallies.forEach((rally: Rally) => {
      const marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: rally.location.coordinates[1],
          lng: rally.location.coordinates[0]
        }
      });
    });
  }
}

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

async function getRallies(polygon: Array<number[]>): Promise<Rally[]> {
  return axios.post('./api/rally', polygon).then((res: AxiosResponse) => {
    return res.data as Rally[];
  });
}

function convertBoundsToPolygon(bounds: google.maps.LatLngBounds): Array<number[]> {
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
</script>

<template>
  <div id="map" class="h-200 sm:w-200 w-full"></div>
</template>

<style scoped></style>
