import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Lending'
import Register from './components/register/Register'
import Login from './components/login/Login'
import Footer from './components/layout/Footer'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="AppClasses">
          <Navbar />
          <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
