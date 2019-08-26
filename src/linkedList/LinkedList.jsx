import React, { Component } from "react";
import LinkedListNode from "./LinkedListNode";
import "../App.css";

const head = Symbol("head");

class LinkedList extends Component {
  constructor(props) {
    super(props);
    this[head] = null;
    this.state = {
      currentInput: "",
      insertedValues: [],
      value: "",
      errorMessage: ""
    };
  }

  //this function adds nodes to linked list
  add(data) {
    const newNode = new LinkedListNode(data);
    if (this[head] === null) {
      this[head] = newNode;
      console.log(newNode.data);
    } else {
      let current = this[head];
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
      console.log(newNode.data);
    }
  }

  //this is where the magic happens. n - indicates the value, we want to get from the end
  getNthToLastValue = n => {
    if (this[head] === null || n < 1) {
      return null;
    } else {
      //creating two pointers
      let nthBehind = this[head];
      let current = this[head];

      //in for loop pointer 'current' iterates through n elements
      for (let i = 0; i < n; ++i) {
        if (current === null) {
          return null;
        }
        current = current.next;
      }

      //in while loop we are now continue iterating through the end of the list.
      //nthBehind starts iterate from very begining.
      //And by the time 'current' pointer reaches the end 'nthBegind' pointer stops at that nth value
      while (current !== null) {
        nthBehind = nthBehind.next;
        current = current.next;
      }
      this.setValue(nthBehind.data);
      return nthBehind.data;
    }
  };

  setValue = data => {
    this.setState({
      value: data
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInsert = () => {
    this.state.currentInput > 0 &&
      this.generateLinkedList(this.state.currentInput);
  };

  generateLinkedList = value => {
    this.add(value);
    this.setState({ currentInput: "" });
  };

  errorMessage = text => {
    this.setState({
      errorMessage: text
    });
  };

  getTheFifthValue = () => {
    this.getNthToLastValue(5) === null
      ? this.errorMessage("Not enough values inserted")
      : this.getNthToLastValue(5) && this.errorMessage("");
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      this.handleInsert();
    }
  };

  render() {
    return (
      <div className="linkedList-container">
        <div className="linkedList">
          <h1>Linked list which returns 5th last value</h1>
          {this.state.errorMessage.length > 0 && (
            <span className="errorMessage">{this.state.errorMessage}</span>
          )}
          <div className="input-group mb-3" style={{ width: "45%" }}>
            <input
              className="form-control"
              type="number"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              name="currentInput"
              placeholder="Insert numbers to linked list (once at a time)"
              onChange={this.handleInput}
              onKeyDown={this.keyPressed}
              value={this.state.currentInput}
              min="0"
              required
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                type="button"
                id="button-addon2"
                onClick={this.handleInsert}
              >
                Click to insert value in to the list
              </button>
            </div>
          </div>
          <div>
            <h4>Already inserted values: {this.state.insertedValues}</h4>
          </div>
          <div>
            <button className="btn btn-dark" onClick={this.getTheFifthValue}>
              Click to get the 5-th value of Linked List
            </button>
          </div>
          {this.state.value.length > 0 && (
            <h4>5th value is: {this.state.value}</h4>
          )}
        </div>
      </div>
    );
  }
}

export default LinkedList;
