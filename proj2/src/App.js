import React, { Component } from 'react';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { text: { author: "Author placeholder", text: "Text placeholder" }, image: "<h1>Image placeholder</h1>" };
    this.generateMedia = this.generateMedia.bind(this);
  }

  // todo: generateMedia should incorporate the randomizer function and send the results into the media panel
  // after this is done, the active tab should load and save its contents, but the others should wait until they activate
  // make sure to flush the content 
  generateMedia(results) {
    const print = Object.values(results);
    const prant = Object.keys(results)
    alert("you have selected: " + prant + " : " + print);
    axios.get(this.randomMedia({folder: "text", format: ".json"}, [results["text"]]))
      .then(res => {
        console.log(res);
        this.setState({ text: res.data });
      });

    // todo: feed this URL to the tab components, and let them make an axios get when they are active
    let imageUrl = this.randomMedia({ folder: "images", format: ".svg" }, [results["image"]])
    console.log(imageUrl)
    axios.get(imageUrl).then(res => { this.setState({ image: res.data }) });
  };

  randomMedia(type, categories) {
    let i = Math.round(Math.random() * (categories.length - 1))
    let i2 = Math.round(Math.random() * 3 + 1)
    return "assets/" + type["folder"] + "/" + categories[i] + "/" + i2 + type["format"]
  }

  // todo: create tab element that can feed its contents to the media area
  // idea: have a top parent being the media area itself, where the state resides?

  render() {
    const image = this.state["image"];
    return (
      <div className="App">
        <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: image }} />
        <div className="TextField"><h3>{this.state.text["author"]}</h3>{this.state.text["text"]}</div>
        <div className="TabRow">
          <div className="t1">Tab1</div>
        </div>
        <div className="ToolPanel">
          <SelectorPanel groups={[{
            groupName: "image",
            legend: "Choose an image category",
            options: ["abstract", "night", "icons"]
          },
          {
            groupName: "text",
            legend: "Choose a text category",
            options: ["animal", "flowers", "summer"]
          }]} onSubmit={this.generateMedia} buttonText="Create my image!" />
        </div>
      </div>
    );
  }
}

export default App;
