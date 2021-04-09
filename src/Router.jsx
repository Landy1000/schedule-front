import React from 'react';
import {useHistory, Router, Route, Link, Switch} from "react-router-dom";
import {SignUp, LogIn, Home} from './components/templates';
//import { generateRequireSignInWrapper } from 'redux-token-auth'

//const requireSignIn = generateRequireSignInWrapper({
  //redirectPathIfNotSignedIn: '/login',
//})

const Router = () => {
  //const history = useHistory();
  return(
    <Router>
      <ul>
        <li><Link to="/signup">新規登録</Link></li>
        <li><Link to="/login/">ログイン</Link></li>
      </ul>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login/" exact component={LogIn} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default Router;