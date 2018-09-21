import React, { Component} from 'react';

class Tab extends Component {
  onClick = () => {
    this.props.onClick(this.props.label);
  }

  render() {
    let className="tab-individual"
    if (this.props.activeTab === this.props.label) {
      className += " tab-current";
    }

    return (
      <li className={className}
      onClick={this.onClick} style={{cursor: "pointer"}}>
        {this.props.label}
      </li>
    )
  }
}

export default Tab;
