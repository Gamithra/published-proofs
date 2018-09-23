import { BrowserRouter, Route, Link } from 'react-router-dom'

import React from 'react'
import ReactDOM from 'react-dom'
import Hsbc from './pages/hsbc/hsbc';
import Verify from './pages/verify'
import Bank from './pages/bank/bank'

const Menu = () => (
  <ul>
    <li><Link to='/bank'>Bank</Link></li>
    <li><Link to='/verify'>Verify Proof</Link></li>
    <li><Link to='/sanna'>Sanna</Link></li>
  </ul>
)

const App = () => (
  <div>
    <Route exact path='/' component={Menu} />
    <Route exact path='/bank' component={Hsbc} />
    <Route exact path='/verify' component={Verify}/>
    <Route exact path='/sanna' component={Bank}/>
  </div>
)

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
