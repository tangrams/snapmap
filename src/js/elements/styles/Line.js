import React from 'react';
import { mapObject } from '../../tools.js';
import { STYLE_BLOCKS, parseBlock } from '../../blocks.js';

// Element
import UiBlockElement from '../UiBlockElement'

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

        parseBlock('lines', ev, (block) => {
            this.props.update({ address: this.props.address+':style_conf', value: block });
        })
    }

    render () {
        return (
            <div>
                <div className='element_type'>
                    <span className='element_type_label'>{this.props.name}</span>
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
                        <span className='element_label'>Color:&ensp;</span>
                        <ButtonColor color={this.props.config.color} address={this.props.address+':color'} update={this.props.update}/>
                    </div>
                    <div>
                        <span className='element_label'>Width:&ensp;</span>
                        <InputNumber number={this.props.config.width} address={this.props.address+':width'} update={this.props.update}/>
                    </div>
                    <div>
                        <span className='element_label'>Style:&ensp;</span>
                        <DropdownButton bsSize="xsmall" title={this.props.config.style} id={`${this.props.name}-style`} onSelect={this.styleChange}>
                            { mapObject(STYLE_BLOCKS.lines, (style, result) => {
                                return <MenuItem 
                                        key={style}
                                        eventKey={style}
                                        active={(style === this.props.config.style)}>{style}</MenuItem>
                            }) }
                        </DropdownButton>
                    </div>
                    <div>
                        {mapObject((this.props.config.style_conf.shaders && this.props.config.style_conf.shaders.defines) || {}, (key, result) => {
                            return <UiBlockElement address={this.props.address+':style_conf:shaders:defines:'+key} key={key} config={result} update={this.props.update}/>
                        })}
                        {mapObject((this.props.config.style_conf.shaders && this.props.config.style_conf.shaders.uniforms) || {}, (key, result) => {
                            return <UiBlockElement address={this.props.address+':style_conf:shaders:uniforms:'+key} key={key} config={result} update={this.props.update}/>
                        })}
                    </div>
                </Panel>
            </div>
        );
    }
}

export default Polygon;
