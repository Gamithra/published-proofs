import React, { Component } from "react";

// material-ui dependencies
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import './publish.css';

import { publishProof } from "../lib/publishproof";

export default class Publish extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   balance: 10000,
    //   months: 3
    // }
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let balance = event.target.balance.value;
    let months = event.target.months.value;

    // publish proof
    await publishProof("Mr. Linus", balance, `last ${months} months`);
  }

  render() {
    return (
      <div className="publish-component">
        <h2 className="header">Publish Proof</h2>

        <form onSubmit={this.handleFormEvent}>
          During the last
          <input
            name="months"
            type="number"
            width="30"
          />
          months, I've maintained an average balance of at least
          <input
            name="balance"
            type="number"
            autoComplete="off"
            label="Balance"
            margin="normal"
            width="5"
          />
          GBP.
          <br />
          <button className="submit-button" type="submit">
            Publish Proof
          </button>
        </form>
      </div>
    );
  }
}
