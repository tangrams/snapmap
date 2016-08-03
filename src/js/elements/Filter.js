import React from 'react';

import { mapObject } from '../tools.js';

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

// Element
import UiBlockElement from './UiBlockElement'

class Filter extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: true
        };

        this.delFilter = this.delFilter.bind(this);
    }

    delFilter (event) {
        this.props.erase({ address: this.props.address });
    }

    render () {
        const defines = (this.props.config.shaders && this.props.config.shaders.defines) || {};
        const uniforms = (this.props.config.shaders && this.props.config.shaders.uniforms) || {};

        return (
            <div>
                <div className='element_type' onClick={()=> this.setState({ open: !this.state.open })}>
                    <span className='element_type_label'>{this.props.name}</span>
                    <Button bsStyle='default'
                            bsSize='xsmall' 
                            onClick={this.delFilter}>
                            <Glyphicon glyph='minus'/>
                    </Button>
                </div>
                <Panel collapsible expanded={this.state.open}>
                    {mapObject(defines, (key, result) => {
                        return <UiBlockElement address={this.props.address+':shaders:defines:'+key} key={key} config={result} update={this.props.update}/>
                    })}
                    {mapObject(uniforms, (key, result) => {
                        return <UiBlockElement address={this.props.address+':shaders:uniforms:'+key} key={key} config={result} update={this.props.update}/>
                    })}
                </Panel>
            </div>
        );
    }
}

export default Filter;