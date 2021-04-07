import React, { Component, Fragment } from "react";
class PaperInput extends Component {
  constructor(props) {
    console.log(props);
    this.state = {
      modelValue: props.name ? props.name : ""
    };
  }
  changeInput = (e) => {
    this.setState({
      modelValue: e.target.value
    });
  };
  render() {
    return (
      <Fragment>
        <span>{this.state.modelValue}</span>
        <input
          type="text"
          value={this.state.modelValue}
          onChange={(e) => this.changeInput(e)}
        />
      </Fragment>
    );
  }
}
export default PaperInput;
