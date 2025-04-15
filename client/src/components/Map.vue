<script setup lang="ts">
import { drawMap, hideAndShowMarkers, convertBoundsToPolygon, loader } from './Map.utilities';
import { rallyAPI } from './Rally.api';
import { useRallyStore } from '../stores/rally';
import { type Rally } from '../types/Rally.interface';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const store = useRallyStore();
const { activeRally } = storeToRefs(store);

let map: google.maps.Map;
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
let rallies: Rally[] = [];
let rallyError: unknown;

watch(activeRally, () => {
  if (activeRally.value) {
    map.setCenter({
      lat: activeRally.value.location.coordinates[1],
      lng: activeRally.value.location.coordinates[0],
    });
  }
});

onMounted(async () => {
  const { event } = await loader.importLibrary('core');
  const mapElement: HTMLElement | null = document.getElementById("map");

  if (mapElement) {
    map = await drawMap(mapElement);

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
  <div id="map" class="h-full basis-200 min-w-md"></div>
</template>

<style scoped></style>
