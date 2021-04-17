import React from 'react';
import { Route, Switch} from "react-router-dom";
import {SignUp, SignIn, Home, RoomEdit} from './components/templates';

// <Route path="/room/new" exact component={CreateRoom} />
// <Route path="/room(/:id)?") component={Room} />

// generateRequireSignInWrapperのissueより
import  { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const LOGIN_PATH = '/signin'
const requireSignIn = Component =>
  compose(
    withRouter,
    connect(state => ({ authUser: state.users })),
  )(({ authUser, ...props }) => {
    useEffect(() => {
      if (!authUser.isSignedIn) props.history.push(LOGIN_PATH)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])
    return authUser ? <Component {...props} /> : null
  })


const Router = () => {
  return(
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin/" exact component={SignIn} />
        <Route path="/" exact component={requireSignIn(Home)} />
        <Route path="/room/edit" exact component={requireSignIn(RoomEdit)} />
      </Switch>
  );
};

export default Router;