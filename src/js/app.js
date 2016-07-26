import React from 'react';
import ReactDOM from 'react-dom';

import yaml from 'js-yaml';
import { createObjectURL } from './tools.js';
import { BASE_STYLES, STYLES } from './const.js';

// Main Components
import Map from './Map';
import Panel from './Panel';

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
                            style: 'none',
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
                            styles: []
                        },
                        water: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#333',
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
                            styles: []
                        },
                        landuse: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#666',
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
                            styles: []
                        },
                        roads: {
                            source: 'mapzen',
                            base_style: 'lines',
                            style: 'none',
                            color: '#FFF',
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
                            styles: []
                        },
                        buildings: {
                            source: 'mapzen',
                            base_style: 'polygons',
                            style: 'none',
                            color: '#999',
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
                            styles: []
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
            case 6:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]] = ev.value;
                break;
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
        let imports = [...this.state.scene.import];

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

            if (oldLayer.base_style === "text") {
                console.log(oldLayer);
                newLayer.draw[oldLayer.base_style] = { 
                                                        font: {
                                                            fill: oldLayer.color,
                                                            size: oldLayer.font.size.value.toString() + oldLayer.font.size.unit
                                                        }
                                                    };
            } else {
                newLayer.draw[oldLayer.base_style] = { order: 'global.order', color: oldLayer.color };

                if (oldLayer.style !== 'none') {
                    newLayer.draw[oldLayer.base_style].style = oldLayer.base_style + '-' + oldLayer.style;
                    console.log(STYLES[oldLayer.base_style])
                    console.log(STYLES[oldLayer.base_style][oldLayer.style])

                    if (STYLES[oldLayer.base_style][oldLayer.style]) {
                        let url = STYLES[oldLayer.base_style][oldLayer.style].url;
                        console.log(url)
                        if (url && url !== '') {
                            if (imports.indexOf(url) === -1 ) {
                                imports.push(url);
                            }
                        }
                    }
                }

                if (oldLayer.base_style === "lines") {
                    newLayer.draw[oldLayer.base_style].width = oldLayer.width.value.toString() + oldLayer.width.unit;
                } else if (oldLayer.base_style === "points") {
                    newLayer.draw[oldLayer.base_style].size = oldLayer.size.value.toString() + oldLayer.size.unit;
                } 
            }
            
            layers[layer] = newLayer;
        }
        yaml_string += yaml.safeDump( { layers: layers }, options);

        // Import
        yaml_string += yaml.safeDump( { import: imports }, options);

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