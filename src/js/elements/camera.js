import React from 'react';

import { mapObject } from '../tools.js';
import { CAMERA_TYPES } from '../const.js';

// Bootstrap components
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class Camera extends React.Component {
    constructor (props) {
        super(props);

        this.typeChange = this.typeChange.bind(this);
    }

    typeChange (ev) {
        this.props.update({ address: this.props.address+':type' , value: ev});
    }

    render () {
        return (
            <div>
                <span className='element_label'>type:</span>
                <DropdownButton bsSize='xsmall' title={this.props.config.type} id={`${this.props.address}:type`} onSelect={this.typeChange}>
                    { CAMERA_TYPES.map( (type) => {
                        return <MenuItem 
                                key={type}
                                eventKey={type}
                                active={(type === this.props.config.type)}>{type}</MenuItem>
                    }) }
                </DropdownButton>
            </div>
        );
    }
}

export default Camera;
