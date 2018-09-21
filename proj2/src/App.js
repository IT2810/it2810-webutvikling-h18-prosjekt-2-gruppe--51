import React, { Component } from 'react';
import './App.css';
import SelectorPanel from "./SelectorPanel.js"
import AudioPanel from "./AudioPanel.js"
import TextPanel from "./TextPanel.js"
import axios from 'axios';
import Tabs from "./Tabs.js";

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
    //creates randomized lists that ensure the media displayed in different
    //tabs are random, but also doesn't show up more or less than once
    let textList = this.randomMediaList();
    let imageList = this.randomMediaList();
    let audioList = this.randomMediaList();

    axios.get(this.randomMediaToPath({ folder: "text", format: ".json" }, [results["text"]], textList[0]))
      .then(res => {
        this.setState({ text1: <TextPanel json={res.data} /> });
      });

    axios.get(this.randomMediaToPath({ folder: "text", format: ".json" }, [results["text"]], textList[1]))
      .then(res => {
        this.setState({ text2: <TextPanel json={res.data} /> });
    });

    axios.get(this.randomMediaToPath({ folder: "text", format: ".json" }, [results["text"]], textList[2]))
      .then(res => {
        this.setState({ text3: <TextPanel json={res.data} /> });
    });

    axios.get(this.randomMediaToPath({ folder: "text", format: ".json" }, [results["text"]], textList[3]))
      .then(res => {
        this.setState({ text4: <TextPanel json={res.data} /> });
    });

    // todo: feed this URL to the tab components, and let them make an axios get when they are active
    let imageUrl1 = this.randomMediaToPath({ folder: "images", format: ".svg" }, [results["image"]], imageList[0])
    axios.get(imageUrl1).then(res => { this.setState({ image1: res.data }) });

    let imageUrl2 = this.randomMediaToPath({ folder: "images", format: ".svg" }, [results["image"]], imageList[1])
    axios.get(imageUrl2).then(res => { this.setState({ image2: res.data }) });

    let imageUrl3 = this.randomMediaToPath({ folder: "images", format: ".svg" }, [results["image"]], imageList[2])
    axios.get(imageUrl3).then(res => { this.setState({ image3: res.data }) });

    let imageUrl4 = this.randomMediaToPath({ folder: "images", format: ".svg" }, [results["image"]], imageList[3])
    axios.get(imageUrl4).then(res => { this.setState({ image4: res.data }) });

    let audioURL1 = this.randomMediaToPath({ folder: "audio", format: ".mp3" }, [results["audio"]], audioList[0])
    const audioPanel1 = <AudioPanel url={audioURL1} />
    this.setState({ audio1: audioPanel1 })

    let audioURL2 = this.randomMediaToPath({ folder: "audio", format: ".mp3" }, [results["audio"]], audioList[1])
    const audioPanel2 = <AudioPanel url={audioURL2} />
    this.setState({ audio2: audioPanel2 })

    let audioURL3 = this.randomMediaToPath({ folder: "audio", format: ".mp3" }, [results["audio"]], audioList[2])
    const audioPanel3 = <AudioPanel url={audioURL3} />
    this.setState({ audio3: audioPanel3 })

    let audioURL4 = this.randomMediaToPath({ folder: "audio", format: ".mp3" }, [results["audio"]], audioList[3])
    const audioPanel4 = <AudioPanel url={audioURL4} />
    this.setState({ audio4: audioPanel4 })
  };

// Old function, no longer used anywhere
  randomMedia(type, categories) {
    let i = Math.round(Math.random() * (categories.length - 1))
    let i2 = Math.round(Math.random() * 3 + 1)
    return "assets/" + type["folder"] + "/" + categories[i] + "/" + i2 + type["format"]
  }

  //shuffles a list to randomize the location of content in the tabs
  randomMediaList() {
    let list = [1, 2, 3, 4];
    let temp, randomIndex;
    for (let i = 0; i < list.length; i++) {
      randomIndex = Math.floor(Math.random() * i);
      temp = list[i];
      list[i] = list[randomIndex];
      list[randomIndex] = temp;
    }
    return list;
  }

  //returns the file location of content based on the index
  randomMediaToPath(type, categories, index) {
    let i = Math.round(Math.random() * (categories.length - 1))
    //let i2 = Math.round(Math.random() * 3 + 1);
    return "assets/" + type["folder"] + "/" + categories[i] + "/" + index + type["format"];
  }

  // todo: create tab element that can feed its contents to the media area
  // idea: have a top parent being the media area itself, where the state resides?

  render() {
    const image1 = this.state["image1"];
    const image2 = this.state["image2"];
    const image3 = this.state["image3"];
    const image4 = this.state["image4"];
    return (
      <div className="App">
        <div className="clearfix">
        <Tabs className="Tabs">
          <div label="Tab 1">
            <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: image1 }} />
            <div className="TextField">
              {this.state.text1}
            </div>
            <div className="AudioArea">
              {this.state.audio1}
            </div>
          </div>
          <div label="Tab 2">
            <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: image2 }} />
            <div className="TextField">
              {this.state.text2}
            </div>
            <div className="AudioArea">
              {this.state.audio2}
            </div>
          </div>
          <div label="Tab 3">
            <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: image3 }} />
            <div className="TextField">
              {this.state.text3}
            </div>
            <div className="AudioArea">
              {this.state.audio3}
            </div>
          </div>
          <div label="Tab 4">
            <div className="GalleryImage" dangerouslySetInnerHTML={{ __html: image4  }} />
            <div className="TextField">
              {this.state.text4}
            </div>
            <div className="AudioArea">
              {this.state.audio4}
            </div>
          </div>
        </Tabs>
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
