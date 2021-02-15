import Dances, { Dance, DanceMap } from "../Constants/dances";

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
  readonly username = "";
  readonly email = "";
  readonly coordinates = undefined;
  readonly active = true;
  readonly chats = [];
  readonly uid = "";
  readonly dances = Dances;
  static create(): Profile {
    return new Profile();
  }
}
