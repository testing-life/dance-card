import firebase from 'firebase';
import Dances, { Dance, DanceMap } from '../Constants/dances';

export type IProfile = {
  username: string;
  email: string;
  coordinates: firebase.firestore.GeoPoint | undefined;
  active: boolean;
  chats: string[];
  uid: string;
  dances: DanceMap;
  // dances: [string, DancePosition][] ;
};

export class Profile implements IProfile {
  username = '';
  email = '';
  coordinates = new firebase.firestore.GeoPoint(0, 0);
  active = true;
  chats = [];
  readonly uid = '';
  dances = Dances;
  static create(): Profile {
    return new Profile();
  }
}
