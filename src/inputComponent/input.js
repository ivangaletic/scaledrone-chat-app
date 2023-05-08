import {Component} from "react";
import React from "react";

class Input extends Component {
  state = {
    text: ""
  }

  //change text based on input
  onChange(e) {
    this.setState({text: e.target.value});
  }

  //send text upon ENTER or button press
  onSubmit(e) {
    e.preventDefault();
    this.setState({text: ""});
    this.props.onSendMessage(this.state.text);
  }

  //render input component
  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;