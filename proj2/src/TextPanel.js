import React, { Component } from 'react'

export default class TextPanel extends Component {

  render() {
    if (!this.props.json) {
      return (
        <div>
          <h1>Generate media for text to appear</h1>
        </div>
      )
    }
    
    return (
      <div>
        <h1>{this.props.json.title}</h1>
        <h2>{this.props.json.author}</h2>
        <p>{this.props.json.text}</p>
      </div>
    )
  }
}
