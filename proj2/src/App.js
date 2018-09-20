import React, { Component } from 'react';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import AudioPanel from "./AudioPanel.js"
import TextPanel from "./TextPanel.js"
import axios from 'axios';
import GalleryTab from './GalleryTab';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {activeTab: 0, tabs: [{loaded: false, text: <TextPanel />,
      image: "<h1>Image placeholder</h1>",
      audio: <AudioPanel />}, {loaded: false}, {loaded:false}, {loaded:false}]};
    this.generateMedia = this.generateMedia.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.randomMediaSet = this.randomMediaSet.bind(this);
  }

  generateMedia(results) {

    this.setState({tabs: [this.randomMediaSet(results), this.randomMediaSet(results), this.randomMediaSet(results), this.randomMediaSet(results)]})
    this.loadTab(0);

  };

  loadTab(indx) {
    
    this.setState((state) => {
      let tabs = state.tabs;
      let t = tabs[indx];
      let audio = <AudioPanel url={t.audioURL}/>
      let img; let txt;
      // image and text fail to load because async
      axios.get(t.imageURL).then(res => { img = res.data })
      axios.get(t.textURL).then(res => { txt = <TextPanel json={res.data}/> })
      tabs[indx] = {loaded: true, audio: audio, image: img, text: txt}
      return {tabs: tabs}
    })
  }

  switchTab(indx) {
    console.log("switching tab to " + indx);
    if (!this.state.tabs[indx].loaded) {
      this.loadTab(indx);
    }

    this.setState((state) => {
      return { activeTab: indx }
    })
  }

  randomMediaSet(results) {
    return {
      loaded: false,
      audioURL: this.randomMedia({ folder: "audio", format: ".mp3" }, [results["audio"]]),
      imageURL: this.randomMedia({ folder: "images", format: ".svg" }, [results["image"]]),
      textURL: this.randomMedia({ folder: "text", format: ".json" }, [results["text"]])
    }
  }

  randomMedia(type, categories) {
    let i = Math.round(Math.random() * (categories.length - 1))
    let i2 = Math.round(Math.random() * 3 + 1)
    return "assets/" + type["folder"] + "/" + categories[i] + "/" + i2 + type["format"]
  }

  render() {
    const tI = this.state.activeTab;
    const aTab = this.state.tabs[tI]
    return (
      <div className="App">
        <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: aTab.image }} />
        <div className="TextField">
          {aTab.text}
        </div>
        <div className="AudioArea">
          {aTab.audio}
        </div>
        <div className="TabRow">
          <GalleryTab label="Tab1" onClick={() => this.switchTab(0)}/>
          <GalleryTab label="Tab2" onClick={() => this.switchTab(1)}/>
          <GalleryTab label="Tab3" onClick={() => this.switchTab(2)}/>
          <GalleryTab label="Tab4" onClick={() => this.switchTab(3)}/>
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
