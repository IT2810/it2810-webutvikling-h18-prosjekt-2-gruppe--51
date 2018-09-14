import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {text: {author: "placeholder", text:"bob"}};
    this.generateMedia = this.generateMedia.bind(this);
  }

  generateMedia(results) {
    const print = Object.values(results);
    const prant = Object.keys(results)
    alert("you have selected: " + prant + " : " + print);
    axios.get("assets/text/facts/1.json")
    .then(res => {
      console.log(res);
      this.setState({text: res.data});
  })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SelectorPanel groups={[{groupName: "image", 
        legend: "Choose an image category", 
        options: ["art", "abstract", "animals"]},
        {groupName: "text",
        legend: "Choose a text type", 
        options: ["haiku", "jokes", "facts"]}]} onSubmit={this.generateMedia} buttonText="Create my image!"/>
        <div><h1>{this.state.text["author"]}</h1>{this.state.text["text"]}</div>
      </div>
    );
  }
}

export default App;
