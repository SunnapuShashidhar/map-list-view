import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { API_BASE_URL, endpoints } from '../config/config';
import {getUniqueId} from 'react-native-device-info' 
// Request location permissions
export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

// Share location with the backend
export const shareLocation = async () => {
  const userId=await getUniqueId();
  const hasPermission = await requestLocationPermission();

  if (!hasPermission) {
    Alert.alert('Location permission denied');
    return;
  }

  await Geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const timestamp = new Date().toISOString();

      try {
        const response = await fetch(`${API_BASE_URL}${endpoints.SHARE_LOCATION}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, latitude, longitude, timestamp }),
        });

        if (response.ok) {
          Alert.alert('Location shared successfully!');
        } else {
          throw new Error(`Error sharing location: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Something went wrong while sharing location.');
      }
    },
    (error) => console.error('Geolocation Error:', error.message),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

export const getCurrentLocation = async (setMyCurrentLocation: (value: any) => void) => {
  try {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      Alert.alert('Location permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMyCurrentLocation({ latitude, longitude });
      },
      (error) => console.error('Error getting location:', error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  } catch (error) {
    console.error('Error getting location:', error);
  }
}
// Fetch all users with their locations
export const fetchAllUsersWithLocation = async (setOtherLocations: (value: any) => void) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoints.FETCH_LOCATIONS}`, { method: 'GET' });
    if (response.ok) {
      const locations = await response.json();
      setOtherLocations(locations);
    } else {
      console.error('Error fetching locations:', response);
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};