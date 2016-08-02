import React from 'react';

import { mapObject } from '../tools.js';

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
        this.valueChange = this.valueChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    delFilter (event) {
        this.props.erase({ address: this.props.address });
    }

    valueChange (event) {
        let address = event.target.getAttribute('data-address')+':value';
        // console.log(ev, address, value);
        this.props.update({ address: address, value: event.target.value });
    }

    selectChange (eventKey, event) {
        let address = event.target.getAttribute('data-address')+':value';
        // console.log('selectChange', eventKey, event, address);
        this.props.update({ address: address, value: eventKey });
    }

    render () {
        const styles = {
            input_container: {
                width: '100%'
            },
            input: {
                height: '22px',
                width: '50%',
                fontSize: '13px',
                textAlign: 'right',
                color: 'black'
            }
        }

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
                    { mapObject(this.props.config, (key, result) => {
                        if (result.type === 'number') {
                            return (
                                <div style={styles.input_container} key={key}>
                                    <span  className='element_label'>{result.label}:&ensp;</span>
                                    <input  type='number' 
                                            data-address={this.props.address+':'+key} 
                                            style={styles.input} 
                                            value={parseFloat(result.value)} 
                                            min={parseFloat(result.range.min)} 
                                            max={parseFloat(result.range.max)}
                                            step={parseFloat(result.range.step)}
                                            onChange={this.valueChange}/>
                                </div>);
                        }
                        else if (result.type === 'dropdown') {
                            return (
                                <div style={styles.input_container} key={key}>
                                    <span className='element_label'>{result.label}:&ensp;</span>
                                    <DropdownButton 
                                        bsSize='xsmall' 
                                        title={result.value}
                                        onSelect={this.selectChange}>
                                        { result.values.map( (val) => {
                                            return <MenuItem 
                                                    key={val}
                                                    eventKey={val}
                                                    data-address={this.props.address+':'+key} 
                                                    active={(val === result.value)}>{val}</MenuItem>
                                            }) 
                                        }
                                    </DropdownButton>
                                </div>);
                        }
                    }) }
                </Panel>
            </div>
        );
    }
}

export default Filter;