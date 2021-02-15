import React, { FunctionComponent, useRef } from 'react';
import Firebase from '../../Firebase/firebase';
import { navigate, Link } from '@reach/router';
import * as ROUTES from '../../Constants/routes';
import { useUser } from '../../Contexts/user.context';
import './Navigation.component.css';
import { useProfile } from '../../Contexts/profile.context';
type Props = {
  firebase: Firebase;
};

const NavigationComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
  const { clearUser } = useUser();
  const { profile } = useProfile();
  const isLoggedIn = firebase.getCurrentUser();

  // useEffect(() => {
  //   console.log('profile :>> ', profile);
  //   if (!profile.active) {
  //     chatLinkRef.current?.setAttribute('disabled', 'true');
  //   } else {
  //     chatLinkRef.current?.removeAttribute('disabled');
  //   }
  //   console.log('object', chatLinkRef);
  // }, [profile]);

  return (
    <div>
      <nav>
        <Link className="button" to={ROUTES.HOME}>
          Home
        </Link>
        <Link className="button" to={ROUTES.PROFILE}>
          Profile
        </Link>
        <Link
          className={`button ${profile.active ? '' : 'disabled'}`}
          to={profile.active ? ROUTES.CHATS : './'}
        >
          Chats
        </Link>
        <button
          className="button button-outline"
          onClick={() => {
            firebase.doSignOut();
            localStorage.clear();
            navigate(ROUTES.LOG_IN);
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default NavigationComponent;
