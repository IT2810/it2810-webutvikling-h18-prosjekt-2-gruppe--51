import React, { Component } from 'react';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {text: {author: "placeholder", text:"bob"}};
    this.generateMedia = this.generateMedia.bind(this);
  }

  // todo: generateMedia should incorporate the randomizer function and send the results into the media panel
  // after this is done, the active tab should load and save its contents, but the others should wait until they activate
  // make sure to flush the content 
  generateMedia(results) {
    const print = Object.values(results);
    const prant = Object.keys(results)
    alert("you have selected: " + prant + " : " + print);
    // idea: save the response of a get into a variable?
    // eg. this.setState ({image: res.dataFromAsvgFetchWhenActivated})
    axios.get("assets/text/facts/1.json")
    .then(res => {
      console.log(res);
      this.setState({text: res.data});
  })
  }

  // todo: make static version with some basic grid css
  // todo: hook up selector panel to a randomizer function
  // todo: create tab element that can feed its contents to the media area
    // idea: have a top parent being the media area itself, where the state resides?

  render() {
    return (
      <div className="App">
        <div className="MediaArea">
          <img src="assets/images/night/1.svg" alt=""></img>
          <div className="TextField"><h1>{this.state.text["author"]}</h1>{this.state.text["text"]}</div>
        </div>
        <div className="TabRow">
          <div className="t1">Tab1</div>
        </div>
        <div className="ToolPanel">
          <SelectorPanel groups={[{groupName: "image", 
          legend: "Choose an image category", 
          options: ["art", "abstract", "animals"]},
          {groupName: "text",
          legend: "Choose a text type", 
          options: ["haiku", "jokes", "facts"]}]} onSubmit={this.generateMedia} buttonText="Create my image!"/>
        </div>
      </div>
    );
  }
}

export default App;
