import React, { Component } from 'react'

import './publish.css'
import logo from './ver1b-white.png'

import { publishProof } from '../lib/publishproof'

export default class Publish extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: false, published: false }
    this.handleFormEvent = this.handleFormEvent.bind(this)
  }

  // push transactions to the blockchain by using eosjs
  async handleFormEvent (event) {
    // stop default behaviour
    event.preventDefault()

    this.setState({ loading: true })

    // collect form data
    let balance = event.target.balance.value
    let months = event.target.months.value

    // publish proof
    await publishProof('Linus Unnebäck', balance, `last ${months} months`)

    this.setState({ loading: false, published: true })
  }

  renderForm () {
    return (
      <form onSubmit={this.handleFormEvent} className='publish-form'>
        During the last

        <p>
          <input
            name='months'
            type='number'
            width='30'
          />
          months,
        </p>
        I've maintained an average balance of at least
        <p>
          <input
            name='balance'
            type='number'
            autoComplete='off'
            width='5'
            step='500'
            min='500'
          /> GBP.
        </p>

        Recipient's e-mail address: <br />
        <input name='recipient' />
        <button className='submit-button' type='submit'>
          Send proof
        </button>

      </form>
    )
  }

  renderLoading () {
    return (
      <p>
        Publishing proof to the blockchain...
      </p>
    )
  }

  renderPublished () {
    return (
      <p>
        Proof successfully published to the blockchain!
      </p>
    )
  }

  render () {
    const { published, loading } = this.state

    return (
      <div className='publish-component'>
        <div className='company-name'>
          <img src={logo} alt='logo' className='logo' />
        </div>

        {published ? this.renderPublished() : loading ? this.renderLoading() : this.renderForm()}

        <p className='footer'> Powered by <span className='underline'>Sanna</span> </p>
      </div>
    )
  }
}
