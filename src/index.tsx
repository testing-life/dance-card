import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./Firebase/firebase";
import { AuthProvider } from "./Contexts/auth.context";
import { MsgNotificationProvider } from "./Contexts/messageNotification.context";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => {
        return (
          <AuthProvider firebase={firebase}>
            <MsgNotificationProvider firebase={firebase}>
              <App />
            </MsgNotificationProvider>
          </AuthProvider>
        );
      }}
    </FirebaseContext.Consumer>
  </FirebaseContext.Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
