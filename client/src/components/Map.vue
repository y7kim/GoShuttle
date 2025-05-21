<script setup lang="ts">
import { hideAndShowMarkers, convertBoundsToPolygon, loader, useMap, useRallies } from '../helpers/Map.utilities';
import { onMounted, watch } from 'vue';

const { map, initMap } = useMap();
const { activeRally, rallies, rallyError, fetchRallies } = useRallies();

let markers: google.maps.marker.AdvancedMarkerElement[] = [];

watch(activeRally, () => {
  if (activeRally.value) {
    map.value?.setCenter({
      lat: activeRally.value.location.coordinates[1],
      lng: activeRally.value.location.coordinates[0],
    });
  }
});

onMounted(async () => {
  const { event } = await loader.importLibrary('core');
  const mapElement: HTMLElement | null = document.getElementById("map");

  if (mapElement) {
    await initMap(mapElement);

    if (map.value) {
      event.addListener(map.value, 'idle', async () => {
        if (map.value) {
          const currentBounds: google.maps.LatLngBounds | undefined = map.value.getBounds();

          if (currentBounds) {
            await fetchRallies(convertBoundsToPolygon(currentBounds));
            hideAndShowMarkers(map.value, markers, rallies);
          }
        }
      });
    }
  }
});
</script>

<template>
  <div id="map" class="h-full basis-200 min-w-md"></div>
</template>

<style scoped></style>
