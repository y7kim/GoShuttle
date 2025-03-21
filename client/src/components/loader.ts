import { GOOGLE_MAPS_API_KEY } from '../../api-keys.const';
import { Loader } from '@googlemaps/js-api-loader';

export const loader: Loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});