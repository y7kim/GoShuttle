import { defineStore, type StoreDefinition } from 'pinia';
import type { Rally } from '../types/Rally.interface';

export const useRallyStore = defineStore('rallies', {
    state: () => {
        return {
            rallies: [] as Rally[]
        }
    },
    actions: {
        updateRallies(newRallies: Rally[]) {
            this.rallies = newRallies;
        }
    }
})