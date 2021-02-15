import React, { Fragment } from 'react'
import { RouteComponentProps, Router } from '@reach/router';
import { UserProvider } from '../Contexts/user.context';
import { HomeComponent } from '../Components/Home/Home.component';
import HeaderComponent from '../Components/Header/Header.component';
import { GeolocationProvider } from '../Contexts/geolocation.context';
import { ProfileProvider } from '../Contexts/profile.context';
import Firebase, { FirebaseContext } from '../Firebase/firebase';

const HomePage = (_: RouteComponentProps) => {
    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <Fragment>
                    <UserProvider>
                        <GeolocationProvider>
                            <ProfileProvider firebase={firebase}>
                                <HeaderComponent firebase={firebase} />
                                <HomeComponent firebase={firebase}/>
                            </ProfileProvider>
                        </GeolocationProvider>
                    </UserProvider>
                </Fragment>
            }
        }
        </FirebaseContext.Consumer>



    )
}

export default HomePage;