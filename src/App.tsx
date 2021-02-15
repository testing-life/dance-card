import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { LandingPage } from './Pages/Landing';
import { LoginPage } from './Pages/Login';
import { SignUpPage } from './Pages/Signup';
import * as ROUTES from './Constants/routes'
import HomePage from './Pages/Home';
import { useAuth } from './Contexts/auth.context';
import { ProfilePage } from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.component';
import { ChatPage } from './Pages/Chat';
import { ChatsListPage } from './Pages/ChatsList';
import { SingleChatPage } from './Pages/SingleChat';
function App() {
  const { auth } = useAuth(); 
console.log(auth,'app');

  return (
      <Router>
         <LandingPage path='/'/>
      <LoginPage path={ROUTES.LOG_IN} />
      <SignUpPage path={ROUTES.SIGN_UP} />
      <PrivateRoute as={HomePage} path={ROUTES.HOME}/>
      <PrivateRoute as={ProfilePage} path={ROUTES.PROFILE}/>
      <PrivateRoute as={ChatPage} path={ROUTES.CHAT}/>
      <PrivateRoute as={ChatsListPage} path={ROUTES.CHATS}/>
      <PrivateRoute as={SingleChatPage} path={ROUTES.SINGLE_CHAT}/>
      </Router>
  );

}

export default App;
