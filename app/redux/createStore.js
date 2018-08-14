import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import phones from 'masmovil-app/app/redux/phones'

export const API_URL = 'http://192.168.56.1:8000/'
const client = axios.create({
  baseURL: API_URL,
  responseType: 'json'
})

const store = createStore(
  phones,
  applyMiddleware(
    axiosMiddleware(client),
  )
)
export default store
