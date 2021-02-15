import React, { useState, useContext, useEffect } from 'react';
import Firebase from '../Firebase/firebase';
import { GeoQuerySnapshot } from 'geofirestore';
import { Profile } from '../Models/profile.models';

type ProfileConsumer = {
  profile: Profile;
  setProfile: (val: Profile) => void;
  getProfileFromStorage: () => Profile;
};

const profileStorageType = 'profile';
const userStorageType = 'user';

const ProfileContext = React.createContext<ProfileConsumer>(
  {} as ProfileConsumer
);

type Props = {
  children: React.ReactNode;
  firebase?: Firebase;
};

export const ProfileProvider = ({ ...props }: Props) => {
  const [profile, setProfileInState] = useState<Profile>({} as Profile);

  const getProfileFromStorage = () =>
    JSON.parse(localStorage.getItem(profileStorageType) as string);
  const getUserFromStorage = () =>
    JSON.parse(localStorage.getItem(userStorageType) as string);

  useEffect(() => {
    const storageProfile = getProfileFromStorage();
    if (storageProfile) {
      setProfile(storageProfile);
    } else {
      const localUser = getUserFromStorage();
      const profile = props.firebase
        ?.getUsers()
        .where('uid', '==', localUser.uid);
      profile &&
        profile
          .get()
          .then((docs: GeoQuerySnapshot) => {
            if (docs) {
              docs.forEach((doc) => setProfile(doc.data()));
            } else {
              setProfile(Profile.create());
            }
          })
          .catch((error) => console.log(error));
    }
  }, []);

  const setProfile = (newProfile: Profile | undefined): void => {
    if (newProfile) {
      setProfileInState(newProfile);
    } //merge rather than overwrite
    localStorage.setItem(profileStorageType, JSON.stringify(newProfile));
    // setProfileInState(prevUser => { return {prevUser,...newUser}}) //merge rather than overwrite
  };

  return (
    <ProfileContext.Provider
      value={{ profile, setProfile, getProfileFromStorage }}
      {...props}
    />
  );
};

const { Consumer: ProfileConsumer } = ProfileContext;

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('must use in UserProvider');
  }
  return context;
};
