import React from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import ButtonColor from './ButtonColor'

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
        let address = this.props.name;
        return (
            <div>
                <div>{this.props.name}</div>
                <div>
                    <DropdownButton bsSize="xsmall" title={this.props.config.base_style} id={`${this.props.name}-base_style`} onSelect={this.baseStyleChange}>
                        {BASE_STYLES.map( (style, i) => {
                            if (style === this.props.config.base_style) {
                                return (<MenuItem eventKey={style} key={i} active>{style}</MenuItem>);
                            }
                            else {
                                return (<MenuItem eventKey={style} key={i}>{style}</MenuItem>);
                            }
                        })}
                    </DropdownButton>
                    <ButtonColor color={this.props.config.color} address={'layers:'+address+':color'} update={this.props.update}/>
                    {if (this.props.config.base_style === 'lines') {
                        return (<input type="number" name="quantity" min="0" max="1000">);
                    }}
                </div>
            </div>
        );
    }
}

export default Layer;