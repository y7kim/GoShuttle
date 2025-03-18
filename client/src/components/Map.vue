<script setup lang="ts">

import { Loader } from '@googlemaps/js-api-loader';
import { onMounted } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import { type Rally } from '../types/Rally.interface';
import { GOOGLE_MAPS_API_KEY, MAP_ID } from '../../api-keys.const';

defineProps<{ msg: string }>()

const loader: Loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

onMounted(async () => {
  const { AdvancedMarkerElement } = await loader.importLibrary("marker");
  const { Map } = await loader.importLibrary('maps');
  const mapEl: HTMLElement | null = document.getElementById("map");

  const currentLocation: google.maps.LatLngLiteral | null = await getCurrentLocation();
  const rallies: Rally[] = await getRallies();

  if (mapEl) {
    const map = new Map(mapEl, {
      zoom: 15,
      center: currentLocation,
      mapId: MAP_ID
    });

    rallies.forEach((rally: Rally) => {
      const marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: rally.location.coordinates[0],
          lng: rally.location.coordinates[1]
        }
      });
    });
  }
});

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

async function getRallies(): Promise<Rally[]> {
  return axios.get('./api/rally').then((res: AxiosResponse) => {
    return res.data;
  });
}

</script>

<template>
  <h1 class="text-3xl font-bold underline">
    {{ msg }}
  </h1>
  <div id="map" class="h-100"></div>
</template>

<style scoped></style>
