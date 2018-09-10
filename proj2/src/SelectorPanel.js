import React, { Component } from 'react';
import RadioGroup from "./RadioGroup.js";

class SelectorPanel extends Component {

    // {groupName: "foo", options:[]}

    constructor(props) {
        super(props);
        this.state = {groupValues: {}, active: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // set up empty values
        let values = {}
        for (let group of this.props.groups) {
            values[group.groupName] = "";
        }

        this.setState({groupValues: values});
    }

    handleChange (groupName, groupValue) {
        // go through all the children groups and see if each has a valid value, then enable button
        let groupValues = Object.assign({}, this.state.groupValues);
        groupValues[groupName] = groupValue;

        let active = true;
        for (let v in groupValues) {
            if (!Boolean(groupValues[v])) {
                active = false;
            }
        }

        this.setState({active: active, groupValues});
    }

    handleSubmit(event) {
        event.preventDefault();
        const results = Object.values(this.state.groupValues);
        alert("you have selected: " + results);
    }

    render() {
        const radioGroups = this.props.groups.map((group) =>
        <RadioGroup key={group.groupName} options={group.options} legend={group.groupName} notifyParent={this.handleChange}/>);

        return (
            <form onSubmit={this.handleSubmit}>
                {radioGroups}
                <button type="submit" id="generate_media" disabled={!this.state.active}>Select</button>
            </form>
        );
    }
}

export default SelectorPanel;