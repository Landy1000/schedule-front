import React from 'react';
import { Route, Switch} from "react-router-dom";
import {SignUp, SignIn, Home} from './components/templates';
//import { generateRequireSignInWrapper } from 'redux-token-auth'

//const requireSignIn = generateRequireSignInWrapper({
  //redirectPathIfNotSignedIn: '/login',
//})


// <Route path="/room/new" exact component={CreateRoom} />
// <Route path="/room(/:id)?") component={Room} />

const Router = () => {
  return(
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin/" exact component={SignIn} />
        <Route path="/" exact component={Home} />
      </Switch>
  );
};

export default Router;