import React, { FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase'
import ProfileFormComponent from './Profile.form.component'
import ProfileCredentialsChangeComponent from './Profile.credentialsChange.component'

type Props = {
    firebase: Firebase
}

const Profile: FunctionComponent<Props> = ({ firebase }: Props) => {
    return <div>
        <ProfileFormComponent firebase={firebase}/>
        <ProfileCredentialsChangeComponent firebase={firebase}/>
    </div>
}

export default Profile;