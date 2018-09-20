import React, { Component } from 'react'

export default class AudioPanel extends Component {

  render() {
    if (!this.props.url) {
      return (<div>
        Generate a media for sound to start playing!
        </div>)
    }
    return (
      <div>
        <audio controls src={this.props.url} autoPlay="True">Your browser does not support the HTML5 audio property</audio>
        <h6>Sound from Sound Ideas</h6>
      </div>
    )
  }
}
