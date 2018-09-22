import { BrowserRouter, Route, Link } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom'
import Publish from './pages/publish'
import Verify from './pages/verify'
import Bank from './pages/bank/bank'

const Menu = () => (
  <ul>
    <li><Link to='/bank'>Bank</Link></li>
    <li><Link to='/publish'>Publish Proof</Link></li>
    <li><Link to='/verify'>Verify Proof</Link></li>
  </ul>
)

const App = () => (
  <div>
    <Route exact path='/' component={Menu} />
    <Route exact path='/bank' component={Bank} />
    <Route exact path='/publish' component={Publish} />
    <Route exact path='/verify' component={Verify} />
  </div>
)

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
