import React, { Component } from "react";
import "./reverse.css";
import "../App.css";

const regexWithComa = /[a-zA-Z']+/gm;
const regexPlainWord = /[a-zA-Z]+/gm;

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

  reverseWord = (word, regex) => {
    return word.replace(regex, function(text) {
      return text
        .split("")
        .reverse()
        .join("");
    });
  };

  reverseSentence = () => {
    const arrSentence = this.state.sentence.split(" ");
    const reversedArraay = [];
    console.log(arrSentence);

    for (let i = 0; i < arrSentence.length; i++) {
      if ((arrSentence[i].match(/'/g) || []).length === 1) {
        reversedArraay.push(this.reverseWord(arrSentence[i], regexWithComa));
      } else {
        reversedArraay.push(this.reverseWord(arrSentence[i], regexPlainWord));
      }
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
