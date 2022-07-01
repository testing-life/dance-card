import React, { FunctionComponent, useEffect, useState, ChangeEvent } from 'react';
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import Firebase from '../../Firebase/firebase';
import { GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes';
import { LatLngLiteral } from 'leaflet';
import { useUser } from '../../Contexts/user.context';
import { useProfile } from '../../Contexts/profile.context';
import { Profile } from '../../Models/profile.models';

type Props = {
  firebase: Firebase;
};

const tickerDuration = 10;

export const HomeComponent: FunctionComponent<any> = ({ firebase }: Props) => {
  const { location, locationError } = useGeo();
  const { user } = useUser();
  const { profile, setProfile } = useProfile();
  const [error, setError] = useState<string>();
  const [localUsers, setLocalUsers] = useState<GeoFirestoreTypes.QueryDocumentSnapshot[]>([]);
  const [radius, setRadius] = useState<number>(2);
  const [locationUpdateTicker, setLocationUpdateTicker] = useState(0);

  const fetchLocalUsers = (place: LatLngLiteral, radius: number) => {
    const geoPoint = place && firebase.getGeoPoint(place.lat, place.lng);
    // const geoPoint = place && firebase.getGeoPoint(DEV_LOCATION.lat, DEV_LOCATION.lng);
    const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius });
    query.onSnapshot((res: GeoQuerySnapshot) => {
      const usersWithoutCurrentUser = res.docs.filter(u => u.id !== user.uid).filter(user => user.data().active);
      setLocalUsers(usersWithoutCurrentUser);
    });
  };

  const radiusSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRadius(+e.target.value);
  };

  useEffect(() => {
    if (Object.keys(location).length) {
      fetchLocalUsers(location, radius);
    }
  }, [location, radius, locationError]);

  const getGeoPoint: (latitude: number, longitude: number) => firebase.firestore.GeoPoint = (latitude, longitude) => {
    return firebase.getGeoPoint(latitude, longitude);
  };

  useEffect(() => {
    if (locationUpdateTicker <= tickerDuration) {
      setLocationUpdateTicker(locationUpdateTicker + 1);
    } else {
      const newProfile: Profile = {
        ...profile,
        coordinates: getGeoPoint(location.lat, location.lng),
      };
      firebase
        .getUsers()
        .doc(user.uid)
        .set(newProfile, { merge: true })
        .then(
          docRef => {
            setProfile(newProfile);
          },
          (error: Error) => setError(error.message),
        );
      setLocationUpdateTicker(locationUpdateTicker + 1);
    }
  }, [location]);

  const toggleVisiblity = () => {
    const newProfile: Profile = { ...profile, active: !profile.active };
    firebase
      .getUsers()
      .doc(user.uid)
      .set(newProfile, { merge: true })
      .then(
        docRef => {
          setProfile(newProfile);
        },
        (error: Error) => setError(error.message),
      );
  };

  return (
    <div className="container">
      {error && <p>{error}</p>}
      <div className="row">
        <p className="column">
          You're currently: {profile.active ? 'Visible! Happy to dance.' : 'Invisible. Having a quiet moment.'}{' '}
        </p>
        <button className="column" onClick={toggleVisiblity}>
          Toggle visibility
        </button>
      </div>
      <div>
        lat: {location.lat}
        lng: {location.lng}
      </div>
      <div className="row">
        <span>Search radius: {radius}km</span>
        <input
          type="range"
          name="radius"
          defaultValue={radius}
          min="1"
          step="1"
          max="2000"
          onChange={radiusSliderHandler}
        />
      </div>
      {locationError && <p>{locationError.message}</p>}
      {!!Object.keys(location).length ? (
        <LeafletMap radius={radius} centre={location} markers={localUsers} userActive={profile.active} />
      ) : (
        <p>We do need geolocation to show the map. Please enable it in your browser and reload the page.</p>
      )}
    </div>
  );
};
