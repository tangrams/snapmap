import React from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import ReactCSS from 'reactcss'

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
        this.props.update({ address: this.props.address+':unit', value: ev} );
    }

    render() {
        let style = ReactCSS({
            // input: {
                    height: '22px',
                    transform: 'translate(0,2px)',
                    color: 'black'
                // }
        }, this.props, this.state);

        return (
            <span>
                <input type='number' style={ style } name='quantity' value={this.props.width.value} min='0' max='1000' onChange={this.valueChange}/>
                <DropdownButton bsSize="xsmall" title={this.props.width.unit} id={`${this.props.address}-unit`} onSelect={this.unitChange}>
                    {UNITS.map((unit, i) => {
                        return (<MenuItem eventKey={unit} key={i} active={(unit === this.props.width.unit)? "active" : ""} >{unit}</MenuItem>);
                    })}
                </DropdownButton>
            </span>
        )
    }
}

export default InputNumber;