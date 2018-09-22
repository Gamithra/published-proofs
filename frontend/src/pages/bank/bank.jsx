import React, { Component } from "react";
import "./bank.css";

export class Bank extends Component {
  constructor(props) {
    super(props);
  }
  getTransactions() {
    return [
        {
          vendor: "Lorem ipsum dolor",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Consectetur adipiscing elit",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Proin lectus sem",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Malesuada sed ipsum",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Lacinia fermentum libero",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Commodo nulla tincidunt ",
          date: "2018-09-22",
          amount: 20
        },
        {
          vendor: "Vivamus lacinia fringilla",
          date: "2018-09-22",
          amount: 20
        },
    ];
  }
  render() {
    const transactions = this.getTransactions();
    const currency = "$";

    return (
      <div id="bank-container">
        <div className="header">
          <div className="container">
            <div className="bank-name">
                <img src="https://i.imgur.com/DdZzVZ7.png" className="logo" />
                EOS Bank
            </div>
            <div className="actions">
                <div className="action balance">
                    <div className="balance-title">Your balance:</div>
                    <div className="balance-value">
                        {currency}{transactions.reduce((prev, current) => prev + current.amount, 0).toFixed(2)}
                    </div>
                </div>
                <div className="action">
                    <button>Send Info</button>
                </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <table cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Date</th>
                  <th className="align-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.vendor}</td>
                    <td>{tx.date}</td>
                    <td className="align-right">{currency}{tx.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Bank;
