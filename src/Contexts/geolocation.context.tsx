import React, { createContext, useState, useEffect, useContext } from 'react';
import { LatLngLiteral } from 'leaflet';

type GeolocationConsumer = {
  location: LatLngLiteral;
  locationError: PositionError;
};

type Props = {
  children: React.ReactNode;
};

const GeolocationContext = createContext<GeolocationConsumer>({} as GeolocationConsumer);

export const GeolocationProvider = ({ ...props }: Props) => {
  const [location, setLocation] = useState<LatLngLiteral>({} as LatLngLiteral);
  const [locationError, setLocationError] = useState<PositionError>({} as PositionError);
  let mounted = true;

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onChange = ({ coords }: any) => {
    console.log('coords', coords);
    if (mounted) {
      setLocation({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    }
  };

  const onError = (error: PositionError) => {
    setLocationError(error);
  };

  useEffect(() => {
    let watchId: any = undefined;
    navigator.geolocation.getCurrentPosition(onChange, onError, options);
    watchId = navigator.geolocation.watchPosition(onChange, onError, options);

    return () => {
      mounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <GeolocationContext.Provider value={{ location, locationError }} {...props} />;
};

const { Consumer: GeolocationConsumer } = GeolocationContext;

export const useGeo = () => {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error('use with GeolocationProvider');
  }
  return context;
};
