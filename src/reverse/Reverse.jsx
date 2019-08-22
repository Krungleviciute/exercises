import React, { Component } from "react";
import "./reverse.css";
import "../App.css";

class Reverse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence: "",
      reversedSentence: ""
    };
  }

  setSentence = e => {
    this.setState({
      sentence: e.target.value
    });
  };

  //viskas veikia reikia tik sutvarkyt
  reverseSentence = () => {
    const arrSentence = this.state.sentence.split(" ");
    const reversedArraay = [];
    console.log(arrSentence);
    for (let i = 0; i < arrSentence.length; i++) {
      reversedArraay.push(
        arrSentence[i]
          .split("")
          .reverse()
          .join("")
      );
    }
    this.setState({
      reversedSentence: reversedArraay.join(" ")
    });
  };

  resetInput = () => {
    this.setState({
      sentence: "",
      reversedSentence: ""
    });
  };

  render() {
    return (
      <div className="reverse-container">
        <div className="reverse">
          <h1>This is sentence's words reverse exrecise</h1>
          <div>
            <input
              className="form-control"
              type="text"
              name="sentence"
              placeholder="Insert your sentence"
              value={this.state.sentence}
              onChange={this.setSentence}
            />
          </div>
          <div className="reverse-button">
            <button className="btn btn-dark" onClick={this.reverseSentence}>
              Press button to reverse words !
            </button>
            <button className="btn btn-dark" onClick={this.resetInput}>
              Reset
            </button>
          </div>
          {this.state.sentence.length > 0 && (
            <h3>Your current sentence: {this.state.sentence}</h3>
          )}
          {this.state.reversedSentence.length > 0 && (
            <h3>
              Reversed sentence: <b>{this.state.reversedSentence}</b>
            </h3>
          )}
        </div>
      </div>
    );
  }
}

export default Reverse;
