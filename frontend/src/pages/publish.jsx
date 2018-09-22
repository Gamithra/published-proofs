import React, { Component } from 'react'

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import { publishProof } from '../lib/publishproof'

// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  { 'name': 'useraaaaaaaa', 'privateKey': '5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5', 'publicKey': 'EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b' },
  { 'name': 'useraaaaaaab', 'privateKey': '5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg', 'publicKey': 'EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p' },
  { 'name': 'useraaaaaaac', 'privateKey': '5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7', 'publicKey': 'EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58' },
  { 'name': 'useraaaaaaad', 'privateKey': '5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx', 'publicKey': 'EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X' },
  { 'name': 'useraaaaaaae', 'privateKey': '5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg', 'publicKey': 'EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb' },
  { 'name': 'useraaaaaaaf', 'privateKey': '5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK', 'publicKey': 'EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H' },
  { 'name': 'useraaaaaaag', 'privateKey': '5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo', 'publicKey': 'EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw' }
]

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 20
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: '100%'
  },
  pre: {
    background: '#ccc',
    padding: 10,
    marginBottom: 0.0
  }
})

class PublishPage extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   balance: 10000,
    //   months: 3
    // }
    this.handleFormEvent = this.handleFormEvent.bind(this)
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent (event) {
    // stop default behaviour
    event.preventDefault()

    // collect form data
    let balance = event.target.balance.value
    let months = event.target.months.value

    // publish proof
    await publishProof('Mr. Linus', balance, `last ${months} months`)
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              Publish Proof
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper className={classes.paper}>
          <form onSubmit={this.handleFormEvent}>
            During the last
            <TextField
              name='months'
              autoComplete='off'
              label='Months'
              margin='normal'
              fullWidth
            />
            months, I've maintained an average balance of at least
            <TextField
              name='balance'
              autoComplete='off'
              label='Balance'
              margin='normal'
              fullWidth
            />
            GPB.
            <br />
            <Button
              variant='contained'
              color='primary'
              className={classes.formButton}
              type='submit'>
              Publish Proof
            </Button>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(PublishPage)
