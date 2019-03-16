import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwtDecode from 'jwt-decode'

import { GET_ERRORS, SET_CURRENT_USER } from './types'

export const registerUser = (userData, history) => dispatch => {
  axios.post('/users/register', userData)
    .then(() => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS, 
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  axios.post('/login', userData)
    .then(res => {
      const {token} = res.data

      localStorage.setItem('jwtToken', token)// save token to localStorage
      setAuthToken(token)

      const decodedUser = jwtDecode(token)

      dispatch(setCurrentUser(decodedUser))
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS, 
        payload: err.response.data
      })
    )
}

export const setCurrentUser = decodedUser => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedUser
  }
}