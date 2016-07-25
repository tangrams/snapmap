import React from 'react';
import ReactCSS from 'reactcss'

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
import NavItem from 'react-bootstrap/lib/NavItem';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// Custom components
import ButtonColor from '../components/ButtonColor'
import InputNumber from '../components/InputNumber'

const BASE_STYLES = ['polygons', 'lines', 'points', 'text']; 

class Layer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false
        };

        this.baseStyleChange = this.baseStyleChange.bind(this);
    }

    baseStyleChange (ev) {
        this.props.update({ address: 'layers:'+this.props.name+':base_style' , value: ev});
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
            <span>
                <NavItem onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.name}</NavItem>
                <Panel collapsible expanded={this.state.open}>
                    <div style={styles.props}>Base Style:
                        <DropdownButton bsSize="xsmall" title={this.props.config.base_style} id={`${this.props.name}-base_style`} onSelect={this.baseStyleChange}>
                            {BASE_STYLES.map( (style, i) => {
                                return (
                                    <MenuItem eventKey={style}  key={i}
                                        active={(style === this.props.config.base_style) ? "active" : ""}> {style} </MenuItem>
                                );
                            })}
                        </DropdownButton>
                    </div>
                    
                    <div style={styles.props}>Color:
                        <ButtonColor color={this.props.config.color} address={'layers:'+this.props.name+':color'} update={this.props.update}/>
                    </div>
                    {this.props.config.base_style === 'lines' &&
                        <div style={styles.props}>Width:<InputNumber number={this.props.config.width} address={'layers:'+this.props.name+':width'} update={this.props.update}/></div>
                    }
                    {this.props.config.base_style === 'points' && 
                        <div style={styles.props}>Size:<InputNumber number={this.props.config.size} address={'layers:'+this.props.name+':size'} update={this.props.update}/></div>
                    }
                    {this.props.config.base_style === 'text' && 
                        <div style={styles.props}>Size:<InputNumber number={this.props.config.font.size} address={'layers:'+this.props.name+':font:size'} update={this.props.update}/></div>
                    }
                </Panel>
            </span>
        );
    }
}

export default Layer;