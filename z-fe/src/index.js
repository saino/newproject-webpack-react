import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './routers/Routers'
import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Router>
    <Routers store={store} />
  </Router>,
  document.getElementById('root')
)
