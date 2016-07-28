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
                    <ButtonColor color={this.props.config.color} address={'layers:'+this.props.name+':color'} update={this.props.update}/>
                </div>
                
                <div style={styles.props}>Size:<InputNumber number={this.props.config.size} address={this.props.address+':size'} update={this.props.update}/></div>
            </div>
        );
    }
}

export default Polygon;
