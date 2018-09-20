import React, { Component } from 'react';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import AudioPanel from "./AudioPanel.js"
import TextPanel from "./TextPanel.js"
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: <TextPanel />,
      image: "<h1>Image placeholder</h1>",
      audio: <AudioPanel />
    };
    this.generateMedia = this.generateMedia.bind(this);
  }

  // todo: generateMedia should incorporate the randomizer function and send the results into the media panel
  // after this is done, the active tab should load and save its contents, but the others should wait until they activate
  // make sure to flush the content 
  generateMedia(results) {
    axios.get(this.randomMedia({ folder: "text", format: ".json" }, [results["text"]]))
      .then(res => {
        this.setState({ text: <TextPanel json={res.data} /> });
      });

    // todo: feed this URL to the tab components, and let them make an axios get when they are active
    let imageUrl = this.randomMedia({ folder: "images", format: ".svg" }, [results["image"]])
    axios.get(imageUrl).then(res => { this.setState({ image: res.data }) });

    let audioURL = this.randomMedia({ folder: "audio", format: ".mp3" }, [results["audio"]])
    const audioPanel = <AudioPanel url={audioURL} />
    this.setState({ audio: audioPanel })
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
        <div className="TextField">
          {this.state.text}
        </div>
        <div className="AudioArea">
          {this.state.audio}
        </div>
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
          },
          {
            groupName: "audio",
            legend: "Choose a sound category",
            options: ["city", "nature", "sport"]
          }]} onSubmit={this.generateMedia} buttonText="Create my image!" />
        </div>
      </div>
    );
  }
}

export default App;
