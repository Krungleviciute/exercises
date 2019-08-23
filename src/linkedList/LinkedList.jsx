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
      errorMessage: "",
      currentIndex: null
    };
  }

  //this function adds nodes to linked list
  add(data) {
    const newNode = new LinkedListNode(data);
    if (this[head] === null) {
      this[head] = newNode;
      this.setCurrentIndex(0);
      console.log(newNode.data, 0);
    } else {
      let current = this[head];
      let i = 1;
      while (current.next !== null) {
        current = current.next;
        i++;
      }
      current.next = newNode;
      this.setCurrentIndex(i);
      console.log(newNode.data, i);
    }
  }

  //this function gets the value of node with given index
  get(index) {
    if (index > -1) {
      let current = this[head];
      let i = 0;
      while (current !== null && i < index) {
        current = current.next;
        i++;
      }
      this.setValue(current.data);
      return current !== null ? current.data : undefined;
    } else {
      return undefined;
    }
  }

  setCurrentIndex = currIndex => {
    this.setState({
      currentIndex: currIndex
    });
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
  };

  errorMessage = text => {
    this.setState({
      errorMessage: text
    });
  };

  getTheFifthValue = () => {
    const index = Number(this.state.currentIndex);

    if (index < 4) {
      this.errorMessage("Not enough values inserted");
    } else {
      this.get(index - 4);
      this.errorMessage("");
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
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="number"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              name="currentInput"
              placeholder="Insert numbers into a list (once at a time)"
              onChange={this.handleInput}
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
