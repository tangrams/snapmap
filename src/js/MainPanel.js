import React from 'react';
import { mapObject } from './tools.js';

// Bootstrap components
import Nav from 'react-bootstrap/lib/Nav';

// Custom components
import SubPanel from './components/SubPanel';

// Tangram "elements"
import Layer from './elements/Layer';

var Menu = require('react-burger-menu').slide;

class MainPanel extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Menu noOverlay>
                <Nav>
                    <SubPanel name='Cameras:'></SubPanel>
                    <SubPanel name='Layers:'>
                        <Nav>
                            { mapObject(this.props.scene.layers, (key, result) => {
                                return <Layer key={key} address={'layers:'+key} name={key} config={result} update={this.props.update}/>;
                            }) }
                        </Nav>
                    </SubPanel>
                </Nav>
           </Menu>
        );
    }
}

export default MainPanel;
