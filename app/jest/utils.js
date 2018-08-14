import { createStore, applyMiddleware, compose } from 'redux'

import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

import phones from 'masmovil-app/app/redux/phones'


const client = axios.create({
  baseURL: 'http://fakeurl.fake',
  responseType: 'json'
})

var store = null

function actionTracker(errHandler, extraArgument) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof store.accumulator === 'undefined') {
      store.accumulator = []
    }

    store.accumulator.push(action)
    return next(action)
  }
}

export function customCreateRealStore(initialState, done) {

  store = createStore(
    phones,
    applyMiddleware(
      axiosMiddleware(client),
      actionTracker(),
    )
  )

  return store
}

export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
