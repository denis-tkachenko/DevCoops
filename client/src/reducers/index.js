import { combineReducers } from 'redux'
import authReducer from './authreducer'

export default combineReducers({
  auth: authReducer
})
