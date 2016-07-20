import React from 'react';
import ReactDOM from 'react-dom';

import Map from './map';
import Panel from './panel';

class Snapmap extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            scene: {
                sources: { mapzen: { type: 'TopoJSON', url: 'https://vector.mapzen.com/osm/all/{z}/{x}/{y}.topojson'} },
                camera: { type: 'flat' },
                layers: {
                        earth: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#555',
                            filter: []
                        },
                        water: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#333',
                            filter: []
                        },
                        landuse: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#666',
                            filter: []
                        },
                        roads: {
                            source: 'mapzen',
                            base_style: 'lines',
                            style: 'none',
                            color: '#FFF',
                            filter: []
                        },
                        buildings: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#999',
                            filter: []
                        }
                    }
                }
            }

            this.update = this.update.bind(this);
    }

    update (ev) {
        // console.log(ev);
        let address = ev.address.split(':');

        let newScene = this.state.scene;
        newScene[address[0]][address[1]][address[2]] = ev.value;
        this.setState({ scene: newScene });
    }

    render () {
        return (<div>
                    <Panel scene={this.state.scene} update={this.update}/> 
                    <Map />
                </div>);
    }
}

ReactDOM.render(<Snapmap />,  document.getElementById('app'));

Map.init('https://tangrams.github.io/tangram-sandbox/styles/default.yaml');