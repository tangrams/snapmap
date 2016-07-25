import React from 'react';
import ReactDOM from 'react-dom';

import Map from './map';
import Panel from './panel';

import yaml from 'js-yaml';

export function createObjectURL (string) {
    let create = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL); // for Safari compatibliity
    return create(new Blob([string]));
}

class Snapmap extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            scene: {
                import: [ 'https://tangrams.github.io/blocks/global.yaml' ],
                sources: { mapzen: { type: 'TopoJSON', url: 'https://vector.mapzen.com/osm/all/{z}/{x}/{y}.topojson'} },
                camera: { type: 'flat' },
                layers: {
                        earth: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: undefined,
                            color: '#555',
                            width: { 
                                value: 1,
                                unit: 'px'
                            },
                            size: { 
                                value: 5,
                                unit: 'px'
                            },
                            font: {
                                size: { 
                                    value: 16,
                                    unit: 'px'
                                },
                                family: 'helvetica',
                                weight: 100
                            },
                            filter: []
                        },
                        water: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: undefined,
                            color: '#333',
                            width: { 
                                value: 1,
                                unit: 'px'
                            },
                            size: { 
                                value: 5,
                                unit: 'px'
                            },
                            filter: []
                        },
                        landuse: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: undefined,
                            color: '#666',
                            width: { 
                                value: 1,
                                unit: 'px'
                            },
                            size: { 
                                value: 5,
                                unit: 'px'
                            },
                            filter: []
                        },
                        roads: {
                            source: 'mapzen',
                            base_style: 'lines',
                            style: undefined,
                            color: '#FFF',
                            width: { 
                                value: 1,
                                unit: 'px'
                            },
                            size: { 
                                value: 5,
                                unit: 'px'
                            },
                            filter: []
                        },
                        buildings: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: undefined,
                            color: '#999',
                            width: { 
                                value: 1,
                                unit: 'px'
                            },
                            size: { 
                                value: 5,
                                unit: 'px'
                            },
                            filter: []
                        }
                    }
                }
            }

            this.update = this.update.bind(this);
    }

    update (ev) {
        let address = ev.address.split(':');
        let newScene = this.state.scene;

        // TODO's:
        //  -   This is ridiculus, should be a better way to do this,
        //      If I only have pointers... 
        switch (address.length) {
            case 5:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]] = ev.value;
                break;
            case 4:
                newScene[address[0]][address[1]][address[2]][address[3]] = ev.value;
                break;
            case 3:
                newScene[address[0]][address[1]][address[2]] = ev.value;
                break;
            case 2:
                newScene[address[0]][address[1]] = ev.value;
                break;
            case 1: 
                newScene[address[0]] = ev.value;
                break;
            case 0:
                break;
        }

        this.setState({ scene: newScene });

        window.scene.load(createObjectURL(this.getYAML()));
    }

    getYAML() {
        let options = {
            indent: 4
        };

        let yaml_string = "";

        // Import
        yaml_string += yaml.safeDump( { import: this.state.scene.import }, options);

        // Source
        yaml_string += yaml.safeDump( { sources: this.state.scene.sources }, options);

        // Cameras
        yaml_string += yaml.safeDump( { cameras: { cam: this.state.scene.camera } }, options);

        // Layers
        let layers = {};
        for (let layer in this.state.scene.layers) {
            let oldLayer = this.state.scene.layers[layer];
            let newLayer = {
                data: { source: oldLayer.source },
                draw: {}
            }

            newLayer.draw[oldLayer.base_style] = { order: 'global.order', color: oldLayer.color };

            if (oldLayer.style) {
                newLayer.draw[oldLayer.base_style].style = oldLayer.style;
            }

            if (oldLayer.base_style === "lines") {
                newLayer.draw[oldLayer.base_style].width = oldLayer.width.value.toString() + oldLayer.width.unit;
            } else if (oldLayer.base_style === "points") {
                newLayer.draw[oldLayer.base_style].size = oldLayer.size.value.toString() + oldLayer.size.unit;
            }
            layers[layer] = newLayer;
        }
        yaml_string += yaml.safeDump( { layers: layers }, options);

        console.log(yaml_string);
        
        return yaml_string;
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