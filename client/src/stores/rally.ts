import { defineStore, type StoreDefinition } from 'pinia';
import type { Rally } from '../types/Rally.interface';

export const useRallyStore = defineStore('rallies', {
    state: (): {
        rallies: Rally[],
        activeRally: null | Rally
    } => {
        return {
            rallies: [],
            activeRally: null
        }
    },
    actions: {
        updateRallies(newRallies: Rally[]) {
            this.rallies = newRallies;
        },
        updateActiveRally(rally: Rally) {
            this.activeRally = rally;
        }
    }
})