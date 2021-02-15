import React, { FunctionComponent, Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as ROUTES from '../../Constants/routes';
import { useUser } from '../../Contexts/user.context';
import Firebase from '../../Firebase/firebase';
import { Profile } from '../../Models/profile.models';
import { useProfile } from '../../Contexts/profile.context';
import { navigate } from '@reach/router';
import { GeoDocumentReference } from 'geofirestore';

type Props = {
  firebase: Firebase;
};
const ProfileCredentialsChangeComponent: FunctionComponent<Props> = ({
  firebase,
}) => {
  const { user } = useUser();
  const { profile, setProfile } = useProfile();
  const [localError, setLocalError] = useState<string>();
  const { register, handleSubmit, errors } = useForm<Profile>();

  const updateProfileField = (
    field: string,
    value: string,
    userID: string
  ): Promise<any> => {
    const document: GeoDocumentReference = firebase.getUsers().doc(userID);
    return document.update({ [field]: value });
  };

  const updateEmail = (data: Partial<Profile>) => {
    if (!Object.keys(errors).length) {
      firebase
        .getCurrentUser()
        ?.updateEmail(data.email!)
        .then((res) => {
          updateProfileField('email', data.email!, user.uid!)
            .then(() => {
              navigate(ROUTES.HOME);
            })
            .catch((e: Error) => setLocalError(e.message));
        })
        .catch((e: Error) => setLocalError(e.message));
    }
  };

  const updatePassword = (data: any) => {
    if (!Object.keys(errors).length) {
      firebase
        .getCurrentUser()
        ?.updatePassword(data.password)
        .then(
          (docRef) => {
            navigate(ROUTES.HOME);
          },
          (e: Error) => setLocalError(e.message)
        )
        .catch((e: Error) => setLocalError(e.message));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(updateEmail)}>
        <legend>Update email</legend>
        <ul>
          <li>
            <label>
              email
              <input
                type="email"
                defaultValue={profile.email}
                placeholder="email"
                name="email"
                ref={register({ required: true })}
              />
            </label>
          </li>
        </ul>
        <button type="submit">Update email</button>
      </form>
      <form id="passchange" onSubmit={handleSubmit(updatePassword)}>
        <legend>Update Password</legend>
        <ul>
          <li>
            <label>
              password
              <input
                type="password"
                placeholder="password"
                name="password"
                ref={register({ required: true })}
              />
            </label>
            {!!Object.keys(errors).length && console.log(errors)}
          </li>
        </ul>
        {localError && <p>{localError}</p>}
        <button form="passchange" type="submit">
          Update password
        </button>
      </form>
    </div>
  );
};
export default ProfileCredentialsChangeComponent;
