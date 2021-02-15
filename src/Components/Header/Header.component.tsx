import React, { FunctionComponent, Fragment } from 'react'
import Firebase from '../../Firebase/firebase'
import NavigationComponent from './Navigation.component'
import NotificationComponent from './Notifications.component'

type Props = {
    firebase: Firebase
}

const HeaderComponent: FunctionComponent<Props> = ({firebase}:Props) => {
    return (
        <Fragment>
            <NotificationComponent/>
            <NavigationComponent firebase={firebase}/>
        </Fragment>

    )
}

export default HeaderComponent;