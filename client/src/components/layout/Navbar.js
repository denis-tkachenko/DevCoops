import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authactions'

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render () {
    const {isAuthenticated, user} = this.props.auth
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/" onClick={e => this.onLogoutClick(e)}>
            <img src={user.avatar} 
              style={{width: '25px', marginRight: '5px', borderRadius: '100%'}} 
              alt={user.name} 
              title={user.avatar? 'User avatar': "You must have a Gravatare connected to you email to display an image"}
            />
            Logout
          </a>
        </li>
      </ul>
    )
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register" style={{"display": (isAuthenticated? 'none': '')}}>Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">Dev Coops</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated? authLinks: guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar)