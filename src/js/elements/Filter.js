import React from 'react';

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Filter extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: true
        };

        this.delFilter = this.delFilter.bind(this);
    }

    delFilter (ev) {
        this.props.erase({ address: this.props.address });
    }

    render () {
        return (
            <div>
                <div className='element_type' onClick={()=> this.setState({ open: !this.state.open })}>
                    <span className='element_type_label'>{this.props.name}</span>
                    <Button bsStyle='default'
                            bsSize='xsmall' 
                            onClick={this.delFilter}>
                            <Glyphicon glyph='minus'/>
                    </Button>
                </div>
                <Panel collapsible expanded={this.state.open}>

                </Panel>
            </div>
        );
    }
}

export default Filter;