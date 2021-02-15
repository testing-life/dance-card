import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Firebase, { FirebaseContext } from '../Firebase/firebase';
import { UserProvider } from '../Contexts/user.context';
import { ProfileProvider } from '../Contexts/profile.context';
import ChatInputComponent from '../Components/ChatInput/ChatInput.component';
import { MsgNotificationProvider } from '../Contexts/messageNotification.context';
import NavigationComponent from '../Components/Header/Navigation.component';

export const ChatPage = ({ location }: RouteComponentProps) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => {
        return (
          <UserProvider>
            <ProfileProvider>
              <MsgNotificationProvider firebase={firebase}>
                <NavigationComponent firebase={firebase} />
                <ChatInputComponent
                  firebase={firebase}
                  routeProps={location!.state}
                />
              </MsgNotificationProvider>
            </ProfileProvider>
          </UserProvider>
        );
      }}
    </FirebaseContext.Consumer>
  );
};
