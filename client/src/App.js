import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authactions'
import { clearCurrentProfile } from './actions/profileActions'
import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Lending'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Footer from './components/layout/Footer'
import Dashboard from './components/dashboard/Dashboard'

import './App.css'

if(localStorage.jwtToken) {
  const token = localStorage.jwtToken
  const decodedUser = jwtDecode(token)

  setAuthToken(token)// set Authorization header for axios
  store.dispatch(setCurrentUser(decodedUser))// set user and isAuthenticated

  if(decodedUser.exp < Date.now() / 1000) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="AppClasses">
            <Navbar />
            <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/dashboard" component={Dashboard}/>
              </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App