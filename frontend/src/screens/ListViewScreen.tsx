import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useLocationData, MarkerType } from './useLocationData';

const ListViewScreen = () => {
  const { myLocation, otherLocations } = useLocationData();

  const renderItem = ({ item }: { item: MarkerType }) => (
    <View style={styles.item}>
      <Text>User ID: {item.userId}</Text>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
    </View>
  );

  return (
    <FlatList
      data={[myLocation, ...otherLocations].filter(Boolean) as MarkerType[]}
      keyExtractor={(item) => item.userId}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ListViewScreen;
