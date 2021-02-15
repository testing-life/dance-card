import React from "react";
import { RouteComponentProps } from "@reach/router";
import Firebase, { FirebaseContext } from "../Firebase/firebase";
import { UserProvider } from "../Contexts/user.context";
import { ProfileProvider } from "../Contexts/profile.context";
import NavigationComponent from "../Components/Header/Navigation.component";
import SingleChatComponent from "../Components/SingleChat/SingleChat.component";

export const SingleChatPage = ({ location }: RouteComponentProps) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => {
        return (
          <UserProvider>
            <ProfileProvider>
              <NavigationComponent firebase={firebase}/>
              <SingleChatComponent firebase={firebase} routeProps={location!.state}/>
            </ProfileProvider>
          </UserProvider>
        );
      }}
    </FirebaseContext.Consumer>
  );
};
