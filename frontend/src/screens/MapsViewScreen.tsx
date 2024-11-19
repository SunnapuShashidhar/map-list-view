import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocationData } from './useLocationData';
import { shareLocation } from '../screens/helpers';
import RouteMapScreen from './RouteMapScreen';
const MapViewScreen = () => {
  const { myLocation, otherLocations, loader } = useLocationData();
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const handleMarkerPress = (location: any) => {
    setSelectedLocation(location);
  };
  return (
    <View style={styles.container}>
      {loader ? (selectedLocation ? (
        <RouteMapScreen
          myLocation={myLocation}
          destination={selectedLocation}
          onBack={() => setSelectedLocation(null)}
        />
      ) : (
        <>
          <Button onPress={() => shareLocation()} title="share my current location" />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: myLocation?.latitude || 37.78825,
              longitude: myLocation?.longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {otherLocations.map((location, index) => (
              <Marker
                key={`marker-${index}`}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                pinColor="red"
                title={`User ID: ${location.userId}`}
                onPress={() => handleMarkerPress(location)}
              />
            ))}
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
          </MapView>
        </>

      )) : <Text>loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapViewScreen;
