import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const UNITS = ['px', 'm']; 

class InputNumber extends React.Component {
    constructor (props) {
        super(props);

        this.valueChange = this.valueChange.bind(this);
        this.unitChange = this.unitChange.bind(this);
    }

    valueChange (ev) {
        this.props.update({ address: this.props.address+':value', value: ev.target.value} );
    }

    unitChange (ev) {
        console.log(ev);
        this.props.update({ address: this.props.address+':unit', value: ev} );
    }

    render() {
         const styles = {
            input: {
                height: '22px',
                fontSize: '13px',
                textAlign: 'right',
                color: 'black'
            }
        }

        return (
            <span>
                <input type='number' style={styles.input} value={this.props.number.value} min='0' max='1000' onChange={this.valueChange}/>
                <DropdownButton bsSize="xsmall" title={this.props.number.unit} id={`${this.props.address}-unit`} onSelect={this.unitChange}>
                    {UNITS.map( (unit) => {
                        return ( 
                            <MenuItem 
                                key={unit} 
                                eventKey={unit} 
                                active={(unit === this.props.number.unit)} >
                                    {unit}
                            </MenuItem>);
                    })}
                </DropdownButton>
            </span>
        )
    }
}

export default InputNumber;