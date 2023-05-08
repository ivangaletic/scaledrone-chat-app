import Messages from './messagesComponent/messages';
import './App.css';
import {Component} from "react";
import Input from './inputComponent/input';

//Generate random name for chat room
function randomName() {
  const names = ["Ava Smith (Smithy)", "Isabella Brown (Isie)", "Sophie Thomas (Saffi)", "Emily Williams (Emmy)", "Jessica Jones (Jess)"];
  return names[Math.floor(Math.random() * names.length)];
}

//Generate random color for avatar
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


class App extends Component{

  //object that contains messages and username name and color(avatar)
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor()
    }
  }

  //'drone' is an instance of Scaledrone, constructor ensuers that component is initiliazed upon opening
  //'room' divides users connected to a channel into separate messaging groups
  constructor() {
    super();
    this.drone = new window.Scaledrone("d4brJbevUEb5JAJh", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  //function that sends message to chat room
  //Observable rooms act like regular rooms but provide additional functionality for keeping track of connected users and linking messages to users.
  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

  //component rendering
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Scaledrone</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        {<Input
          onSendMessage={this.onSendMessage}
        />}
      </div>
    );
  }
}

export default App;
