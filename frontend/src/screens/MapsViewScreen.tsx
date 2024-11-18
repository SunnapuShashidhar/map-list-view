import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocationData } from './useLocationData';
import { shareLocation } from '../screens/helpers';

const MapViewScreen = () => {
  const { myLocation, otherLocations, loader } = useLocationData();
  console.log({ myLocation, otherLocations });
  return (
    <View style={styles.container}>
      <Button onPress={() => shareLocation()} title="share my current location" />
      {loader ? <MapView
        style={styles.map}
        initialRegion={{
          latitude: myLocation?.latitude || 37.78825,
          longitude: myLocation?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {myLocation && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}
            pinColor="blue"
            title="My Location"
          />
        )}
        {otherLocations.map((location, index) => (
          <Marker
            key={`marker-${index}`}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="red"
            title={`User ID: ${location.userId}`}
          />
        ))}
      </MapView> : <Text>loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapViewScreen;
