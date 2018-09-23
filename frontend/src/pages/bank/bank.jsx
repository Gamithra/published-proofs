import React, { Component } from "react";
import "./bank.css";
import logo from '../ver1b-white.png';

export class Bank extends Component {
  constructor(props) {
    super(props);
  }
  getTransactions() {
    return [
        {
          name: "Linus Conway",
          bank: "HSBC",
          months: "3",
          success: "Yes",
          date: "2018-09-22",
          amount: 2000
        },
        { name: "Joseph Pickett",
          bank: "Bank of America",
          months: "2",
          success: "Yes",
          date: "2018-09-22",
          amount: 1500
        },
        { name: "Dan Potter",
          bank: "J. P. Morgan",
          months: "12",
          success: "Yes",
          date: "2018-09-22",
          amount: 2500
        },
        { name: "Sophia McCarthy",
          bank: "HSBC",
          months: "1",
          success: "No",
          date: "2018-09-22",
          amount: 3000
        },
        { name: "Woodrow Chambers",
          bank: "Bank of Scotland",
          months: "36",
          success: "Yes",
          date: "2018-09-22",
          amount: 1500
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
                <img src={logo} alt="logo" className="logo" />
                Sanna
            </div>
            <div className="actions">
               Hello, Dan!
               <br/>
               <button className="link"> Log out </button>
            {/*<div className="action balance">
                    <div className="balance-title">Your balance:</div>
                    <div className="balance-value">
                        {currency}{transactions.reduce((prev, current) => prev + current.amount, 0).toFixed(2)}
                    </div>
                </div>
                <div className="action">
                    <button>Send Info</button>
                </div>*/}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="container">
            <table cellPadding="0" cellSpacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Bank</th>
                  <th>Amount</th>
                  <th>Months</th>
                  <th className="align-right">Success</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i}>
                    <td>{tx.name}</td>
                    <td>{tx.date}</td>
                    <td>{tx.bank}</td>
                    <td>{currency}{tx.amount.toFixed(2)}</td>
                    <td>{tx.months}</td>
                    <td className={`align-right ${tx.success === 'Yes' ? 'success' : 'fail'}`}>{tx.success}</td>
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
