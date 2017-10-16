import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import VehicleList from './components/container'
import reducer from './redux'

const store = createStore(reducer, applyMiddleware(thunk))

render(
  <Provider store={store}>
    <VehicleList />
  </Provider>,
  document.getElementById('app'),
)
