import React, { Component } from "react";
import "./hsbc.css";
import Publish from '../publish';

export class Hsbc extends Component {

  constructor(props) {
    super(props);
    this.state = {showPublish: false};
  }

  handleClick = () => {
    this.setState({
      showPublish: true
    });
  }

  render() {
    const publishComponent = (
      <div id="publish-component-container">
          <div id="publish-container">
            <Publish></Publish>
          </div>
      </div>
    );

    return (
      <div id="main-container">
        {this.state.showPublish && publishComponent}
        <div id="hsbc-container">
          <button onClick={this.handleClick} className="send-info">
            Send Info
            <span className="send-icon"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default Hsbc;
