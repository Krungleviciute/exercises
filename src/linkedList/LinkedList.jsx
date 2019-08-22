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
      numbersArray: [],
      value: "",
      errorMessage: ""
    };
  }

  //this function adds nodes to linked list
  add(data) {
    const newNode = new LinkedListNode(data);
    if (this[head] === null) {
      this[head] = newNode;
    } else {
      let current = this[head];
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
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
      this.setState({
        value: current.data
      });
      return current !== null ? current.data : undefined;
    } else {
      return undefined;
    }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInsert = () => {
    this.state.currentInput.length > 0 &&
      this.setState(
        prevState => {
          prevState.numbersArray.push(this.state.currentInput);
        },
        () => {
          this.setState({ currentInput: "" });
        }
      );
  };

  generateLinkedList = array => {
    for (let i = 0; i < array.length; i++) {
      this.add(array[i]);
    }
  };

  getTheFifthValue = () => {
    let array = this.state.numbersArray;
    let arrayLength = array.length;
    if (arrayLength < 5) {
      this.setState({ errorMessage: "Not enough inserted values" });
    } else {
      this.generateLinkedList(array);
      this.get(arrayLength - 5);
      this.setState({ errorMessage: "" });
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
            <h4>Already inserted values: </h4>
            {this.state.numbersArray.map((number, index) => (
              <h5 key={index} style={{ display: "inline-block" }}>
                {number},
              </h5>
            ))}
          </div>
          <div>
            <button className="btn btn-dark" onClick={this.getTheFifthValue}>
              Click to get the 5-th value of Linked List
            </button>
          </div>
          <div>
            {this.state.value.length > 0 && <h3>{this.state.value}</h3>}
          </div>
        </div>
      </div>
    );
  }
}

export default LinkedList;
