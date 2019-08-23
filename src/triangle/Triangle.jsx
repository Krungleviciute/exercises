import React, { Component } from "react";
import "../App.css";

class Triangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstInput: "",
      secondInput: "",
      thirdInput: "",
      typeOfTriangle: "",
      errorMessage: ""
    };
  }

  onInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    this.notEmpty()
      ? this.isTriangleExists()
        ? this.triangleType()
        : this.errorMessage("Triangle does not exists")
      : this.errorMessage("Input field/fields cannot be empty");
  };

  errorMessage = message => {
    this.setState({
      errorMessage: message
    });
  };

  setTriangleType = type => {
    this.setState({
      typeOfTriangle: type
    });
  };

  isTriangleExists = () => {
    const firstInput = Number(this.state.firstInput);
    const secondInput = Number(this.state.secondInput);
    const thirdInput = Number(this.state.thirdInput);
    return (
      thirdInput < firstInput + secondInput &&
      secondInput < firstInput + thirdInput &&
      firstInput < secondInput + thirdInput
    );
  };

  triangleType = () => {
    if (this.isTriangleEquilateral()) {
      this.setTriangleType("Equilateral");
    } else if (this.isTriangleIsosceles()) {
      this.setTriangleType("Isosceles");
    } else {
      this.setTriangleType("Scalene");
    }
    this.errorMessage("");
  };

  notEmpty = () => {
    const { firstInput, secondInput, thirdInput } = this.state;
    return firstInput !== "" && thirdInput !== "" && secondInput !== "";
  };

  isTriangleEquilateral = () => {
    const { firstInput, secondInput, thirdInput } = this.state;
    return (
      firstInput === secondInput &&
      firstInput === thirdInput &&
      secondInput === thirdInput
    );
  };

  isTriangleIsosceles = () => {
    const { firstInput, secondInput, thirdInput } = this.state;
    return (
      firstInput === secondInput ||
      firstInput === thirdInput ||
      secondInput === thirdInput
    );
  };

  render() {
    return (
      <div className="triangle-container">
        <div className="triangle">
          <h1>Type of Triangle</h1>
          <h5>
            If you want to find out what triangle is this, please enter three
            sides of triangle
          </h5>
          {this.state.errorMessage.length > 0 && (
            <span className="errorMessage">{this.state.errorMessage}</span>
          )}
          <div className="input-area">
            <div>
              <label>
                First side:
                <input
                  className="form-control"
                  type="number"
                  pattern="^[0-9]+$"
                  value={this.state.firstInput}
                  onChange={this.onInputChange}
                  name="firstInput"
                  min="0"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Second side:
                <input
                  className="form-control"
                  type="number"
                  value={this.state.secondInput}
                  onChange={this.onInputChange}
                  name="secondInput"
                  min="0"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Third side:
                <input
                  className="form-control"
                  type="number"
                  value={this.state.thirdInput}
                  onChange={this.onInputChange}
                  name="thirdInput"
                  min="0"
                  required
                />
              </label>
            </div>
            <div>
              <button className="btn btn-dark" onClick={this.handleSubmit}>
                Click to find out!
              </button>
            </div>
          </div>
          <div className="result" style={{ padding: "10px 0" }}>
            {this.state.errorMessage.length === 0 && (
              <h2>
                The triangle is: <b>{this.state.typeOfTriangle}</b>{" "}
              </h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Triangle;
