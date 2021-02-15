import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes';
import { useForm, OnSubmit, ErrorMessage } from 'react-hook-form';
import { navigate } from '@reach/router';
import { useGeo } from '../../Contexts/geolocation.context';
import { Profile } from '../../Models/profile.models';
import ErrorMessages from '../../Constants/errors';

type Props = {
  firebase: Firebase;
};

export const SignUpComponent: FunctionComponent<Props> = ({
  firebase,
}: Props) => {
  const { register, handleSubmit, errors } = useForm();
  const { location, locationError } = useGeo();
  const [error, setError] = useState<string | undefined>(undefined);

  const getGeoPoint: (
    latitude: number,
    longitude: number
  ) => firebase.firestore.GeoPoint = (latitude, longitude) => {
    return firebase.getGeoPoint(latitude, longitude);
  };

  const submitHandler: OnSubmit<any> = (data): void => {
    const { email, password, username } = data;
    firebase
      .doEmailRegistration(email, password)
      .then((res: any) => {
        if (res) {
          const doc = {
            ...Profile.create(),
            uid: res.user.uid,
            username: username,
            email: res.user.email,
            coordinates: getGeoPoint(location.lat, location.lng),
          };

          firebase
            .getUsers()
            .doc(res.user.uid)
            .set(doc)
            .then(
              (docRef) => {
                navigate(ROUTES.LOG_IN);
              },
              (error) => setError(error)
            );
        }
      })
      .catch((error: Error) => setError(error.message));
  };

  return (
    <div className="container">
      <br />
      {Object.entries(location).length !== 0 ? (
        <form onSubmit={handleSubmit(submitHandler)}>
          <input
            required
            name="username"
            type="text"
            placeholder="username"
            ref={register({ required: true })}
          />
          <input
            required
            name="email"
            type="email"
            placeholder="email"
            ref={register({ required: true })}
          />
          <input
            required
            name="password"
            type="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.email && <p>email is required</p>}
          {error && <p>{error}</p>}
          <button type="submit">Register</button>
        </form>
      ) : (
        <p>
          {locationError.message}, {locationError.code}. <br />
          {ErrorMessages.get(locationError.code)}
        </p>
      )}
    </div>
  );
};

export default SignUpComponent;
