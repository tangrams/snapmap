import React from 'react';
import ReactCSS from 'reactcss'
import { mapObject } from '../../tools.js';
import { STYLE_BLOCKS } from '../../const.js';

// Bootstrap components
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Custom components
import ButtonToggle from '../../components/ButtonToggle'
import ButtonColor from '../../components/ButtonColor'
import InputNumber from '../../components/InputNumber'

class Polygon extends React.Component {
    constructor (props) {
        super(props);

        this.styleChange = this.styleChange.bind(this);
    }

    styleChange (ev) {
        this.props.update({ address: this.props.address+':style' , value: ev});
    }

    render () {
        const styles = ReactCSS({
            'default': {
                props: {
                        padding: '3px',
                        fontSize: '13px',
                        color: 'black'
                    }
                }
        }, this.props, this.state);

        return (
            <div>
                <p>{this.props.name}</p>

                <div style={styles.props}>Visible:
                    <ButtonToggle value={this.props.config.enable} address={this.props.address+':enable'} update={this.props.update}/>
                </div>

                <div style={styles.props}>Color:
                    <ButtonColor color={this.props.config.color} address={this.props.address+':color'} update={this.props.update}/>
                </div>

                <div style={styles.props}>Style:
                    <DropdownButton bsSize="xsmall" title={this.props.config.style} id={`${this.props.name}-style`} onSelect={this.styleChange}>
                        { mapObject(STYLE_BLOCKS.polygons, (style, result) => {
                            return <MenuItem eventKey={style}  key={style}
                                    active={(style === this.props.config.style) ? "active" : ""}> {style} </MenuItem>
                        }) }
                    </DropdownButton>
                </div>
            </div>
        );
    }
}

export default Polygon;
