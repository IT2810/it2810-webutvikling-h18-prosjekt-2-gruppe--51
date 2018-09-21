import React, { Component } from 'react';
import Tab from './Tab';

/* Handles tabs. Use the following template:
    <Tabs>
      <div label="tab name 1">
        (Tab content)
      </div>
      <div label="tab name 2">
        (Tab content)
      </div>
      etc.
    </Tabs>
*/

class Tabs extends Component {
  // Constructor, sets the active tab to the first one
  constructor(props) {
    super(props);
    this.state = {
      currentTab: this.props.children[0].props.label,
    };
  }

  onClickTab = (tab) => {
    this.setState({ currentTab: tab })
  }



  render() {
    return (
      <div className="tabs">
        <ol className="tab-list">
          {this.props.children.map((child) => {
            const { label } = child.props;
            return (
              <Tab
                currentTab={this.state.currentTab}
                label={label}
                onClick={this.onClickTab}
              />
            );
          })}
        </ol>
        <div className="tab-vindow">
          {this.props.children.map((child) => {
            if (child.props.label !== this.state.currentTab)
              return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
