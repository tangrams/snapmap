import React from 'react';

import { mapObject, keyWithValue } from '../tools.js';

// Bootstrap components
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class UiBlockElement extends React.Component {
    constructor (props) {
        super(props);

        this.valueChange = this.valueChange.bind(this);
        this.selectChange = this.selectChange.bind(this);
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
                fontSize: '13px',
                textAlign: 'right',
                color: 'black'
            }
        };

        let value = this.props.config.value || this.props.config.default_value;

        if (this.props.config.type === 'number') {
            return (
                <div style={styles.input_container}>
                    <span  className='element_label'>{this.props.config.label}:&ensp;</span>
                    <input  type='number' 
                            data-address={this.props.address} 
                            style={styles.input} 
                            value={parseFloat(value)} 
                            min={parseFloat(this.props.config.range.min)} 
                            max={parseFloat(this.props.config.range.max)}
                            step={parseFloat(this.props.config.range.step)}
                            onChange={this.valueChange}/>
                </div>
            );
        }
        else if (this.props.config.type === 'dropdownArray') {
            return (
                <div style={styles.input_container}>
                    <span className='element_label'>{this.props.config.label}:&ensp;</span>
                    <DropdownButton 
                        bsSize='xsmall' 
                        title={value}
                        onSelect={this.selectChange}>
                        { this.props.config.values.map( (val) => {
                            return <MenuItem 
                                    key={val}
                                    eventKey={val}
                                    data-address={this.props.address} 
                                    active={(val === value)}>{val}</MenuItem>
                            }) 
                        }
                    </DropdownButton>
                </div>
            );
        }
        else if (this.props.config.type === 'dropdownList') {
            const values = this.props.config.values;
            const labelValue = keyWithValue(values,value);
            return (
                <div style={styles.input_container}>
                    <span className='element_label'>{this.props.config.label}:&ensp;</span>
                    <DropdownButton 
                        bsSize='xsmall' 
                        title={labelValue}
                        onSelect={this.selectChange}>
                        { mapObject(values, (key, result) => {
                            return <MenuItem 
                                    key={key}
                                    eventKey={result}
                                    data-address={this.props.address} 
                                    active={(key === labelValue)}>{key}</MenuItem>
                            }) 
                        })}
                    </DropdownButton>
                </div>
            );
        }
        else {
            return (<div style={styles.input_container}></div>);
        }
    }
}

export default UiBlockElement;