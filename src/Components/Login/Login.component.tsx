import React, { Fragment, FunctionComponent, useState, useEffect } from 'react';
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes';
import { useForm, OnSubmit } from 'react-hook-form';
import { Link, navigate } from '@reach/router';
import { useUser } from '../../Contexts/user.context';
import { useGeo } from '../../Contexts/geolocation.context';

type Props = {
  firebase: Firebase;
};

export const LoginComponent: FunctionComponent<Props> = ({
  firebase,
}: Props) => {
  const { register, handleSubmit, errors } = useForm();
  const { location, locationError } = useGeo();
  const { setUser } = useUser();
  const [error, setError] = useState<Error | undefined>(undefined);

  const getGeoPoint: (
    latitude: number,
    longitude: number
  ) => firebase.firestore.GeoPoint = (latitude, longitude) => {
    return firebase.getGeoPoint(latitude, longitude);
  };

  const submitHandler: OnSubmit<any> = ({ email, password }, event): void => {
    firebase
      .doEmailSignIn(email, password)
      .then((res: any) => {
        console.log('res', res)
        const { uid, email, displayName, name, refreshToken } = res.user.toJSON();
        res.user.getIdToken();
        console.log('object', res.user.getIdToken());
        localStorage.setItem(
          'user',
          JSON.stringify(Object.assign({}, { uid, email, displayName, name,refreshToken }))
        );
        setUser!({ uid, email, displayName, name,refreshToken });

        firebase
          .getUsers()
          .doc(uid)
          .update({
            coordinates: getGeoPoint(location.lat ?? 0, location.lng ?? 0),
          })
          .then(
            () => {
              navigate(ROUTES.HOME);
            },
            (error) => setError(error)
          );
      })
      .catch((error: Error) => {
        setError(error);
      });
  };

  return (
    <div className="container">
      <br />
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          name="email"
          type="email"
          placeholder="email"
          ref={register({ required: true })}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        {errors.email && <span>email is required</span>}
        {error && (
          <p>
            {error.name} - {error.message}
          </p>
        )}
        <button type="submit">log in</button>
      </form>
      <Link to={ROUTES.SIGN_UP}>No account? Register.</Link>
    </div>
  );
};
