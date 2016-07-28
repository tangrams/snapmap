import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class ButtonToggle extends React.Component {
    constructor (props) {
        super(props);

        let labels = props.labels || ['off','on'];
        let labels_type = props.labels_type || 'text';
        let labels_style = props.labels_style || ['default', 'success']

        this.state = {
            labels: labels,
            labels_type: labels_type,
            labels_style: labels_style
        };

        this.valueChange = this.valueChange.bind(this);
    }

    valueChange (ev) {
        this.props.update({ address: this.props.address, value: !this.props.value} );
    }

    render() {    
        return (
            <Button bsStyle={this.props.value ? this.state.labels_style[1] : this.state.labels_style[0] } 
                    bsSize="xsmall" 
                    onClick={this.valueChange}>
                {(() => {
                    if (this.state.labels_type === 'glyphicon') {
                        return <Glyphicon glyph={this.props.value ? this.state.labels[1] : this.state.labels[0]}/>
                    } else {
                        return this.props.value ? this.state.labels[1] : this.state.labels[0];
                    }
                })()}
            </Button>
        );
    }
}

export default ButtonToggle;

