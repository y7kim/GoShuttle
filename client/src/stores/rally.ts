import { defineStore, type StoreDefinition } from 'pinia';
import type { Rally } from '../types/Rally.interface';

export const useRallyStore = defineStore('rallies', {
  state: (): {
    rallies: Rally[],
    activeRally: null | Rally,
    currentLocation: null | google.maps.LatLngLiteral
  } => {
    return {
      rallies: [],
      activeRally: null,
      currentLocation: null
    }
  },
  actions: {
    updateRallies(newRallies: Rally[]) {
      this.rallies = newRallies;
    },
    updateActiveRally(rally: Rally) {
      this.activeRally = rally;
    },
    updateCurrentLocation(location: google.maps.LatLngLiteral) {
      this.currentLocation = location;
    }
  }
})