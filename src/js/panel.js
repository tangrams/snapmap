import React from 'react';
import { mapObject } from './tools.js';

// Bootstrap components
import Nav from 'react-bootstrap/lib/Nav';

// Custom components
import SubPanel from './components/SubPanel';

// Tangram "elements"
import Layer from './elements/layer';

var Menu = require('react-burger-menu').slide;

class Panel extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Menu noOverlay>
                <Nav bsStyle="pills" stacked activeKey={1}>
                    <SubPanel eventKey={1} name='Sources:'></SubPanel>
                    <SubPanel eventKey={2} name='Cameras:'></SubPanel>
                    <SubPanel eventKey={3} name='Lights:'></SubPanel>
                    <SubPanel eventKey={4} name='Layers:'>
                        <Nav bsStyle="pills" stacked activeKey={1}>
                            { mapObject(this.props.scene.layers, (key, result) => {
                                return <Layer key={key} name={key} config={result} update={this.props.update}/>;
                            }) }
                        </Nav>
                    </SubPanel>
                </Nav>
           </Menu>
        );
    }
}

export default Panel;
