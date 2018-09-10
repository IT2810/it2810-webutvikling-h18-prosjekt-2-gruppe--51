import React, { Component } from 'react';

class RadioGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        // this.notifyParent = this.notifyParent.bind(this);
    }

    // notifyParent(){
    //     return this.state.value;
    // }

    handleChange(event) {
        // if we have a parent, notify it about our changed value
        // if (this.props.parent) {
        //     this.notifyParent();
        // }
        if (this.props.notifyParent) {
        this.props.notifyParent(this.props.legend, event.target.value);
        };
        this.setState({value: event.target.value});
    }

    render() {
        const radios = this.props.options.map((option) =>
        <li key={option}><label><input type="radio" value={option} checked={this.state.value === option} onChange={this.handleChange}></input>{option}</label></li>);
        return (
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <ul>{radios}</ul>
                </fieldset>
        );
    }
}

export default RadioGroup;