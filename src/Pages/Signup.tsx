import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import SignUpComponent from '../Components/SignUp/Signup.component'
import { GeolocationProvider } from '../Contexts/geolocation.context'


export const SignUpPage = (_: RouteComponentProps) => {
    return (
        <GeolocationProvider>
            <FirebaseContext.Consumer>{
                (firebase: Firebase) => {
                    return <SignUpComponent firebase={firebase} />
                }
            }
            </FirebaseContext.Consumer>
        </GeolocationProvider>
    )
}