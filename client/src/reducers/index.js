import { combineReducers } from 'redux'
import authReducer from './authreducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
})
