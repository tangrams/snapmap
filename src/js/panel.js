import React from 'react';

import Layer from './elements/layer';

var Menu = require('react-burger-menu').slide;

function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

class Panel extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
           <Menu >
                <div>Sources:</div>
                <div>Cameras:</div>
                <div>Lights:</div>
                <div>Layers:</div>
                {mapObject(this.props.scene.layers, (key, result) => {
                    return <Layer key={key} name={key} config={result} update={this.props.update}/>;
                })}
           </Menu>
        );
    }
}

export default Panel;
