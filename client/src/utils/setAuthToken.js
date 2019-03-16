import axios from 'axios'

const setAuthToken = token => {
  if(!token) return delete axios.defaults.headers.common['Authorization']

  // apply Authorization to evry axios request
  axios.defaults.headers.common['Authorization'] = token
}

export default setAuthToken