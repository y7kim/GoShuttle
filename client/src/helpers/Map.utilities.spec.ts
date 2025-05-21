/* import { beforeEach, describe, expect, test, vi } from 'vitest';
import { drawMap } from './Map.utilities';

describe('drawMap', () => {
  beforeEach(() => {
    vi.mock('@googlemaps/js-api-loader', () => {
      return {
        Loader: vi.fn().mockImplementation(() => {
          return {
            importLibrary: vi.fn().mockResolvedValue({
              Map: vi.fn().mockImplementation((mapDiv, mapOptions) => [mapDiv, mapOptions])
            })
          }
        })
      }
    });

    const mockNavigator = {
      geolocation: {
        getCurrentPosition: (callback: Function) => {
          callback({
            coords: {
              latitude: 24.180953,
              longitude: -110.288518
            }
          });
        }
      }
    };
    vi.stubGlobal('navigator', mockNavigator);
  });

  test('returns Map instance with correct options', async () => {
    const mockElement = {
      'title': 'This is a mock element'
    } as any;

    const expectedOptions = {
      zoom: 12,
      center: {
        lat: 24.180953,
        lng: -110.288518
      },
      mapId: '43dc29ff046848f2'
    };

    await expect(drawMap(mockElement)).resolves.toStrictEqual([
      mockElement, expectedOptions
    ]);
  });
}); */