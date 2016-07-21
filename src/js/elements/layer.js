import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import ButtonColor from './ButtonColor'
import InputNumber from './InputNumber'

const BASE_STYLES = ['polygons', 'lines', 'points', 'text']; 

class Layer extends React.Component {
    constructor (props) {
        super(props);
        this.baseStyleChange = this.baseStyleChange.bind(this);
    }

    baseStyleChange (ev) {
        this.props.update({ address: 'layers:'+this.props.name+':base_style' , value: ev});
    }

    render () {
        return (
            <div>
                <div>{this.props.name}</div>
                <div>
                    <DropdownButton bsSize="xsmall" title={this.props.config.base_style} id={`${this.props.name}-base_style`} onSelect={this.baseStyleChange}>
                        {BASE_STYLES.map( (style, i) => {
                            return (
                                <MenuItem eventKey={style}  key={i}
                                    active={(style === this.props.config.base_style) ? "active" : ""}> {style} </MenuItem>
                            );
                        })}
                    </DropdownButton>
                    <ButtonColor color={this.props.config.color} address={'layers:'+this.props.name+':color'} update={this.props.update}/>
                    {this.props.config.base_style === 'lines' && 
                        <InputNumber width={this.props.config.width} address={'layers:'+this.props.name+':width'} update={this.props.update}/>
                    }
                </div>
            </div>
        );
    }
}

export default Layer;