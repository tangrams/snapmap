import React from 'react';

import Button from 'react-bootstrap/lib/Button';

class ButtonToggle extends React.Component {
    constructor (props) {
        super(props);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange (ev) {
        this.props.update({ address: this.props.address, value: !this.props.value} );
    }

    render() {    
        return (
            <Button bsStyle={this.props.value ? 'success' : 'default'} bsSize="xsmall" onClick={this.valueChange}>{this.props.value ? 'on' : 'off'}</Button>
        );
    }
}

export default ButtonToggle;

