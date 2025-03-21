<script setup lang="ts">
import { loader } from './loader';
import { drawMap } from './drawMap';
import { rallyAPI } from './Rally.api';
import { useRallyStore } from '../stores/rally';
import { type Rally } from '../types/Rally.interface';
import { onMounted, ref } from 'vue';

const store = useRallyStore();
let markers: google.maps.marker.AdvancedMarkerElement[] = [];
let rallyError = ref<unknown>(null);

onMounted(async () => {
  const { event } = await loader.importLibrary('core');
  const mapElement: HTMLElement | null = document.getElementById("map");

  if (mapElement) {
    const map: google.maps.Map = await drawMap(mapElement);

    event.addListener(map, 'idle', async () => {
      const currentBounds: google.maps.LatLngBounds | undefined = map.getBounds();
      await getRalliesWithinBounds(currentBounds);
      hideAndShowMarkers(map, markers);
    });
  }
});

async function getRalliesWithinBounds(
  bounds: google.maps.LatLngBounds | undefined
): Promise<void> {
  let rallies: Rally[] = [];

  if (bounds) {
    [rallyError.value, rallies] = await rallyAPI.getRalliesWithinBounds(convertBoundsToPolygon(bounds));
  }
  return store.updateRallies(rallies);
}

async function hideAndShowMarkers(
  map: google.maps.Map,
  markers: google.maps.marker.AdvancedMarkerElement[]
) {
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
  <div id="map" class="h-full sm:w-200 w-full"></div>
</template>

<style scoped></style>
