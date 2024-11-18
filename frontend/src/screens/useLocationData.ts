import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission, fetchAllUsersWithLocation, getCurrentLocation } from './helpers';

export interface MarkerType {
  latitude: number;
  longitude: number;
  userId: string;
}

export const useLocationData = () => {
  const [myLocation, setMyLocation] = useState<MarkerType | null>(null);
  const [otherLocations, setOtherLocations] = useState<MarkerType[]>([]);
  const [loader,setLoader]=useState(false);
  useEffect(() => {
    const initialize = async () => {
      await getCurrentLocation(setMyLocation);
      await fetchAllUsersWithLocation(setOtherLocations);
      setLoader(true)
    };

    initialize();
  }, []);

  return { myLocation, otherLocations,loader };
};
