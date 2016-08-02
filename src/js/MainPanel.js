import React from 'react';

import { mapObject } from './tools.js';
import { FILTER_BLOCKS } from './const.js';
import { getBlockSetup } from './blocks.js';

// Tangram "elements"
import Layer from './elements/Layer';
import Light from './elements/Light';
import Camera from './elements/Camera';
import Filter from './elements/Filter';

// Custom components
import SubPanel from './components/SubPanel';

// Bootstrap components
import Nav from 'react-bootstrap/lib/Nav';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

var Menu = require('react-burger-menu').slide;

class MainPanel extends React.Component {
    constructor (props) {
        super(props);

        this.filterAdded = this.filterAdded.bind(this);
    }

    filterAdded (ev) {
        getBlockSetup('filter-'+ev, FILTER_BLOCKS[ev].url, (setup) => {
            this.props.update({ address: 'filters:'+ev , value: setup });
        })
    }

    render () {
        return (
            <Menu noOverlay>
                <Nav>
                    <SubPanel name='Camera:'>
                        <Camera address='camera' config={this.props.scene.camera} update={this.props.update}/>
                    </SubPanel>
                    <SubPanel name='Light:'>
                        <Light address='light' config={this.props.scene.light} update={this.props.update}/>
                    </SubPanel>
                    <SubPanel name='Layers:'>
                        <Nav>
                            { mapObject(this.props.scene.layers, (key, result) => {
                                return <Layer key={key} address={'layers:'+key} name={key} config={result} update={this.props.update}/>;
                            }) }
                        </Nav>
                    </SubPanel>
                    <SubPanel name='Filters:'>
                        <Nav>
                            <div>
                                <span className='element_label'> + </span>
                                <DropdownButton bsSize='xsmall' title='Add Filter...' onSelect={this.filterAdded}>
                                    { mapObject(FILTER_BLOCKS, (key, result) => {
                                        if ( this.props.scene.filters[key] === undefined ) {
                                            return <MenuItem 
                                                key={key}
                                                eventKey={key}>{key}</MenuItem>
                                        }
                                    }) }
                                </DropdownButton>
                            </div>
                            { mapObject(this.props.scene.filters, (key, result) => {
                                return <Filter key={key} address={'filters:'+key} name={key} config={result} update={this.props.update} erase={this.props.erase}/>;
                            }) }
                        </Nav>
                    </SubPanel>
                </Nav>
           </Menu>
        );
    }
}

export default MainPanel;
