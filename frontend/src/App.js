import { useEffect, useState, useRef, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './App.css';
import { GOOGLE_MAPS_API_KEY, MAP_ID, defaultCurrentLocation } from './constants';

function App() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [markers, setMarkers] = useState([]); // State to store marker positions
  const mapRef = useRef(null); // Ref to store the map instance

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  // Memoize the center object to prevent re-creation on every render
  const center = useMemo(() => ({
    lat: location.latitude || defaultCurrentLocation.lat,
    lng: location.longitude || defaultCurrentLocation.lng,
  }), [location]);

  const convertBoundsToArray = (bounds) => {
    if (!bounds) return null;

    const northeast = bounds.getNorthEast();
    const southwest = bounds.getSouthWest();

    // Create an array of 5 coordinates representing the corners of the bounding box
    return [
      [northeast.lng(), southwest.lat()],
      [northeast.lng(), northeast.lat()],
      [southwest.lng(), northeast.lat()],
      [southwest.lng(), southwest.lat()],
      [northeast.lng(), southwest.lat()],
    ];
  };

  const handleMapLoad = (map) => {
    mapRef.current = map; // Save the map instance in the ref
    console.log('Map instance saved:', map);
  };

  const handleDragEnd = () => {
    if (mapRef.current) {
      // Access the map instance from the ref
      const bounds = mapRef.current.getBounds();

      if (bounds) {
        // Convert bounds to an array of corners
        const cornersArray = convertBoundsToArray(bounds);

        // Make a POST request to the API
        fetch('http://localhost:3000/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cornersArray),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((result) => {
            console.log('Search API result:', result);
            setMarkers(result);
          })
          .catch((error) => {
            console.error('Error with the search API:', error);
          });
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">GoShuttle</header>
      <main>
        <h2>Map</h2>
        {location.latitude && location.longitude ? (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center} // Memoized center to prevent re-centering
              zoom={15}
              mapId={MAP_ID}
              onLoad={handleMapLoad} // Save map instance on load
              onDragEnd={handleDragEnd} // Trigger logic when the user stops dragging the map
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={{ lat: marker.location.coordinates[1], lng: marker.location.coordinates[0] }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        ) : (
          <p>Loading map...</p>
        )}
      </main>
    </div>
  );
}

export default App;
