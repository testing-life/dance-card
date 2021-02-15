import React from 'react'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import { RouteComponentProps } from '@reach/router'
import { UserProvider } from '../Contexts/user.context'
import { LandingComponent } from '../Components/Landing/Landing.component'
export const LandingPage = (_: RouteComponentProps) => {

    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <UserProvider>
                    <LandingComponent firebase={firebase}/>
                </UserProvider>
            }
        }

        </FirebaseContext.Consumer>
    )
}