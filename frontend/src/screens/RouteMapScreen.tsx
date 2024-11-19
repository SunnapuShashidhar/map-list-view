import React, { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import haversine from 'haversine';

const RouteMapScreen = ({ myLocation, destination, onBack }: any) => {
  const routeCoordinates = [
    { latitude: myLocation.latitude, longitude: myLocation.longitude },
    { latitude: destination.latitude, longitude: destination.longitude },
  ];

  const distance = haversine(myLocation, destination, { unit: 'km' }).toFixed(2);

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
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="blue"
          strokeWidth={3}
        />
      </MapView>
      <View style={styles.info}>
        <Text style={styles.text}>Distance: {distance} km</Text>
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
export default RouteMapScreen;