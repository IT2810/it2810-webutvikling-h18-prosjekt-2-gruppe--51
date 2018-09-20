import React, { Component } from 'react';

class GalleryTab extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        {this.props.label}
      </div>
    );
  }
}

export default GalleryTab;