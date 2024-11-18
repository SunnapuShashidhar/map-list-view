import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MapViewScreen from '../screens/MapsViewScreen';
import ListViewScreen from '../screens/ListViewScreen';

const TopTabs = () => {
  const [tabs, setTabs] = useState([
    { name: 'List View', component: ListViewScreen, active: true },
    { name: 'Map View', component: MapViewScreen, active: false }
  ]);

  const setTabItem = (index:number) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab, i) => ({
        ...tab,
        active: i === index
      }))
    );
  };

  const ActiveComponent = tabs.find((tab) => tab.active)?.component;

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setTabItem(index)}
            style={[styles.tabBar, item.active && styles.tabBarActive]}
          >
            <Text style={[styles.tabText, item.active && styles.tabTextActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {ActiveComponent && <ActiveComponent />}
      </View>
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
  },
  tabBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  tabBarActive: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#000000',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
});