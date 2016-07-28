import React from 'react';
import ReactCSS from 'reactcss'
import { mapObject } from '../../tools.js';
import { STYLE_BLOCKS } from '../../const.js';

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
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
                text: {
                    fontSize: '13px',
                    color: 'black'
                },
                type: {
                    textAlign: 'right'
                },
                type_label: {
                    color: '#337ab7',
                    fontSize: '14px',
                    paddingRight: '5px'
                }
            }
        }, this.props, this.state);

        return (
            <div>
                <div style={styles.type}>
                    <span style={styles.type_label}>{this.props.name}</span>
                    <ButtonToggle
                        value={this.props.config.enable} 
                        address={this.props.address+':enable'} 
                        update={this.props.update}
                        labels_style={['default', 'default']}
                        labels_type='glyphicon'
                        labels={['eye-close', 'eye-open']}/> 
                </div>
                <Panel collapsible expanded={this.props.config.enable}>
                    <div>
                        <span style={styles.text}>Color:</span>
                        <ButtonColor color={this.props.config.color} address={this.props.address+':color'} update={this.props.update}/>
                    </div>

                    <div> 
                        <span style={styles.text}>Style:</span>
                        <DropdownButton bsSize='xsmall' title={this.props.config.style} id={`${this.props.name}-style`} onSelect={this.styleChange}>
                            { mapObject(STYLE_BLOCKS.polygons, (style, result) => {
                                return <MenuItem eventKey={style}  key={style}
                                        active={(style === this.props.config.style) ? 'active' : ''}> {style} </MenuItem>
                            }) }
                        </DropdownButton>
                    </div>
                </Panel>
            </div>
        );
    }
}

export default Polygon;
