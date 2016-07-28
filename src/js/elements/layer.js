import React from 'react';
import ReactCSS from 'reactcss'

import { TEMPLATES, LAYERS_TEMPLATE } from '../const.js';

// Bootstrap components
import Panel from 'react-bootstrap/lib/Panel';
import NavItem from 'react-bootstrap/lib/NavItem';

// Tangram Style elements
import Polygon from './styles/Polygon'
import Line from './styles/Line'
import Point from './styles/Point'
import Text from './styles/Text'

// Custom components
import ButtonToggle from '../components/ButtonToggle'

class Layer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false
        };

        this.styleChange = this.styleChange.bind(this);
    }

    styleChange (ev) {
        this.props.update({ address: 'layers:'+this.props.name+':style' , value: ev});
    }

    render () {
        const styles = ReactCSS({
            'default': {
                text: {
                        fontSize: '13px',
                        color: 'black'
                    }
            }
        }, this.props, this.state);

        return (
            <span>
                <NavItem onClick={ ()=> this.setState({ open: !this.state.open })}>{this.props.name}</NavItem>
                <Panel collapsible expanded={this.state.open}>
                    { this.props.name === 'buildings' &&
                        <div> 
                            <span style={styles.text}> Extrude:</span>
                            <ButtonToggle value={this.props.config.extrude} address={this.props.address+':extrude'} update={this.props.update}/>
                        </div>
                    }
                    { TEMPLATES.map( (type) => {
                        let style = LAYERS_TEMPLATE[this.props.name][type].style;

                        if (style === 'polygons') {
                            return <Polygon key={type} name={type} address={this.props.address+':'+type} config={this.props.config[type]} update={this.props.update} />
                        } else if (style === 'lines') {
                            return <Line key={type} name={type} address={this.props.address+':'+type} config={this.props.config[type]} update={this.props.update} />
                        } else if (style === 'points') {
                            return <Point key={type} name={type} address={this.props.address+':'+type} config={this.props.config[type]} update={this.props.update} />
                        } else if (style === 'text') {
                            return <Text key={type} name={type} address={this.props.address+':'+type} config={this.props.config[type]} update={this.props.update} />
                        } else {
                            return <div>Error: {type+'-'+style}</div>
                        }

                    }) }
                </Panel>
            </span>
        );
    }
}

export default Layer;