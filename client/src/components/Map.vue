<script setup lang="ts">
import { drawMap, hideAndShowMarkers, convertBoundsToPolygon, loader } from './Map.utilities';
import { rallyAPI } from './Rally.api';
import { useRallyStore } from '../stores/rally';
import { type Rally } from '../types/Rally.interface';
import { onMounted, ref } from 'vue';

const store = useRallyStore();
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
let rallies: Rally[] = [];
let rallyError: unknown;

onMounted(async () => {
  const { event } = await loader.importLibrary('core');
  const mapElement: HTMLElement | null = document.getElementById("map");

  if (mapElement) {
    const map: google.maps.Map = await drawMap(mapElement);

    event.addListener(map, 'idle', async () => {
      const currentBounds: google.maps.LatLngBounds | undefined = map.getBounds();
      if (currentBounds) {
        [rallyError, rallies] = await rallyAPI.getRalliesWithinBounds(convertBoundsToPolygon(currentBounds));
        store.updateRallies(rallies);
        hideAndShowMarkers(map, markers);
      }
    });
  }
});
</script>

<template>
  <div id="map" class="h-full sm:w-3/4 w-full"></div>
</template>

<style scoped></style>
