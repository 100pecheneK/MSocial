import React from 'react'
import withSuspense from './comonents/hoc/withSuspense'
import store from './store'
import {Provider} from 'react-redux'
import {Link, Route, Router, Switch} from 'react-router-dom'
import history from './history'

import Test from './comonents/Test/Test'


function App() {

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/test' component={withSuspense(Test)}/>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
