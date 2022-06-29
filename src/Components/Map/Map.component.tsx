import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { isObjectWithValue } from '../../Utils/object';
import { GeoFirestoreTypes } from 'geofirestore';
import CustomPopup from '../CustomPopup/CustomPopup.component';
import { Link } from '@reach/router';
import * as ROUTES from '../../Constants/routes';
import { Profile } from '../../Models/profile.models';
import './Map.component.css';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

type Props = {
  centre: LatLngLiteral;
  markers: GeoFirestoreTypes.QueryDocumentSnapshot[];
  radius: number;
  userActive: boolean;
};

export const LeafletMap = (props: Props) => {
  // const defaultLocation: LatLngLiteral = {
  //   lat: 45.6982642,
  //   lng: 9.6772698,
  // };

  // const setDefaultLocation = (): LatLngLiteral => {
  //   return isObjectWithValue(props.centre, 'lat')
  //     ? props.centre
  //     : defaultLocation;
  // };

  return (
    <Map style={{ width: '100%', height: '90vw' }} center={props.centre} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker opacity={props.userActive ? 1 : 0.5} position={props.centre}>
        <Popup>You're here</Popup>
      </Marker>
      <Circle center={props.centre} fillColor="blue" radius={props.radius * 1000} />
      {props.markers.map((item: GeoFirestoreTypes.QueryDocumentSnapshot, index: number) => {
        const { coordinates, username, dances, uid } = item.data() as Profile;
        const mapCoords = (coordinates: any): LatLngLiteral => {
          return { lat: coordinates.latitude, lng: coordinates.longitude };
        };

        return (
          <Marker key={index} position={mapCoords(coordinates)}>
            <Popup>
              <strong>{username}</strong>
              <br />
              <CustomPopup dances={dances} />
              <Link to={ROUTES.CHATS} state={{ targetUserID: uid, targetUsername: username }}>
                Message
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};
