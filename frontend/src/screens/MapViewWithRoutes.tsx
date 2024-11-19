import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCUKskwQj__iTF6ynn9Q_APxrJ04JsJp4k'; // Replace with your actual Google Maps API key

const MapViewWithRoutes = ({ myLocation, destination, onBack }:any) => {
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number;longitude: number;}[]>([]);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch route and distance when component mounts
  useEffect(() => {
    const fetchRoute = async () => {
        try {
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${myLocation.latitude},${myLocation.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
          const response = await fetch(url); // Use fetch instead of axios
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
      
          if (data.routes.length > 0) {
            const route = data.routes[0];
            const points = decodePolyline(route.overview_polyline.points);
            setRouteCoordinates(points);
      
            // Update distance and duration
            setDistance(route.legs[0].distance.text);
            setDuration(route.legs[0].duration.text);
          } else {
            console.warn('No routes found');
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

    fetchRoute();
  }, [myLocation, destination]);

  // Decode polyline from Google Maps API
  const decodePolyline = (t: string) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < t.length) {
      let b, shift = 0,
        result = 0;

      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      });
    }

    return points;
  };

  return (
    <View style={styles.container}>
      <Button title="Back to Map" onPress={onBack} />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (myLocation.latitude + destination.latitude) / 2,
          longitude: (myLocation.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(myLocation.latitude - destination.latitude) + 0.1,
          longitudeDelta: Math.abs(myLocation.longitude - destination.longitude) + 0.1,
        }}
      >
        <Marker
          coordinate={{ latitude: myLocation.latitude, longitude: myLocation.longitude }}
          pinColor="blue"
          title="My Location"
        />
        <Marker
          coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
          pinColor="red"
          title="Destination"
        />
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="blue"
            strokeWidth={3}
          />
        )}
      </MapView>
      <View style={styles.info}>
        <Text style={styles.text}>Distance: {distance}</Text>
        <Text style={styles.text}>Duration: {duration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  info: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapViewWithRoutes;