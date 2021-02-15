import React from 'react'
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'

interface IUser {
    uid: number | undefined;
    name: string | undefined;
    email: string | undefined;
    displayName: string | undefined;
    refreshToken: string | undefined;
}
// extends GeoFirestoreTypes.Document 
// g: any;
// l: any;
// d: any; in profile


export class User implements IUser {
    readonly uid = undefined;
    readonly name = undefined;
    readonly email = undefined;
    readonly displayName = undefined;
    readonly refreshToken = undefined;
    static create ():User {return new User()};
}
