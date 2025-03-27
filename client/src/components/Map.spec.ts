import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import Map from './Map.vue';
import { convertBoundsToPolygon, hideAndShowMarkers, loader } from './Map.utilities';
import type { Rally } from '../types/Rally.interface';
import { useRallyStore } from '../stores/rally';

const mockRallies: Rally[] = vi.hoisted(() => {
  return [
    {
      location: {
        type: "Point",
        coordinates: [-110.434189, 24.078269]
      },
      time: "2025-03-25T16:55:52.635Z",
      free: false,
      cost: 5,
      capacity: 2,
      skillLevel: "ADVANCED",
      vehicle: {
        color: "white",
        make: "Toyota Tacoma"
      },
      username: "ORBiker",
      diffMin: 500
    }
  ];
});

const mockMap = vi.hoisted(() => {
  return {
    getBounds: vi.fn().mockReturnValue('test')
  }
});

describe('onMounted()', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());

    vi.mock('./Map.utilities', () => {
      return {
        drawMap: vi.fn().mockResolvedValue(mockMap),
        loader: {
          importLibrary: vi.fn().mockResolvedValue({
            event: {
              addListener: vi.fn().mockImplementation((_mapDiv, _event, callback) => callback())
            },
            AdvancedMarkerElement: vi.fn()
          })
        },
        convertBoundsToPolygon: vi.fn(),
        hideAndShowMarkers: vi.fn()
      }
    });

    vi.mock('./Rally.api', () => {
      return {
        rallyAPI: {
          getRalliesWithinBounds: vi.fn().mockResolvedValue([
            null,
            mockRallies
          ])
        }
      }
    });

    vi.mock('../stores/rally', () => {
      return {
        useRallyStore: vi.fn().mockReturnValue({
          updateRallies: vi.fn()
        })
      }
    });

    mount(Map, { attachTo: document.body });
    await flushPromises();
  });

  test('Google Maps event handler is added', async () => {
    const { event } = await loader.importLibrary('core');

    expect(event.addListener).toHaveBeenCalled();
    expect(convertBoundsToPolygon).toHaveBeenCalledWith('test')
    expect(useRallyStore().updateRallies).toHaveBeenCalledWith(mockRallies);
    expect(hideAndShowMarkers).toHaveBeenCalledWith(mockMap, []);
  });
});