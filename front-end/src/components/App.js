import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'

import Login from './Auth/Login'
import LandingLogin from './Login'
import LandingSignup from './Signup'
import Signup from './Auth/Signup'

import Landing from '../components/Landing'

import Dashboard from './Dashboard'

import { Body } from './Styled'


//const Home = () => <Async load={import('./Home')} />

const App = ({ user }) => {
  let token = localStorage.getItem('token')
 
    return (
      <Body>
     
       
        <Switch>
        <Route exact path="/" component={Landing} />
          <Route path="/signup" component={LandingSignup} />
          <Route path="/login" component={LandingLogin} />
          <Route path="/homepage" component={Landing} />
          <Route path="/dashboard" component={Dashboard} />
         {/*  {token && <Route path="/homepage" component={Homepage} />} */}
        </Switch>
      </Body>
    )
  
}

/*
App.propTypes = {
  user: PropTypes.shape({}).isRequired,
}
*/

export default withRouter(connect(state => ({ user: state.user }))(App))
