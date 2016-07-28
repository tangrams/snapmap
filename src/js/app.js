import React from 'react';
import ReactDOM from 'react-dom';

import yaml from 'js-yaml';
import { VECTOR_SOURCE_NAME, STYLES, TEMPLATES, LAYERS_TEMPLATE, DEFAULT_SCENE, STYLE_BLOCKS } from './const';
import { createObjectURL, dumpStyle } from './tools';


// Main Components
import Map from './Map';
import MainPanel from './MainPanel';

class Snapmap extends React.Component {
    constructor (props) {
        super(props);

        this.state = { scene: DEFAULT_SCENE };

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

        // Add Source
        let sources = {};
        sources[VECTOR_SOURCE_NAME] = this.state.scene.sources.vector_tiles;
        yaml_string += yaml.safeDump( { sources: sources }, options);

        // Add Cameras
        yaml_string += yaml.safeDump( { cameras: { cam: this.state.scene.camera } }, options);

        // Add Ligth
        yaml_string += yaml.safeDump( { 
            lights: { 
                dir: { 
                    type: 'directional',
                    direction: [.1, .5, -1],
                    diffuse: .7,
                    ambient: .5
                } 
            } 
        }, options);

        // Add Layers.  parse the scene and dump the layers in tangram-YAML form
        let layers = {};
        for (let layer in this.state.scene.layers) {
            let jsonCnf = this.state.scene.layers[layer];
            let yamlCnf = {
                data: { source: VECTOR_SOURCE_NAME },
                draw: { }
            }

            // Iterate through all the types of possible templates
            for (let template of TEMPLATES) {
                if (jsonCnf[template].enable) {
                    yamlCnf.draw['_'+template] = dumpStyle(template, LAYERS_TEMPLATE[layer], jsonCnf, imports);
                    if (layer === 'buildings' && jsonCnf.extrude) {
                        yamlCnf.draw['_'+template]['extrude'] = true;
                    }
                }
            }

            // TODO:
            //    - FILTERS

            layers[layer] = yamlCnf;
        }
        yaml_string += yaml.safeDump( { layers: layers }, options);

        // Add Import
        yaml_string += yaml.safeDump( { import: imports }, options);

        console.log(yaml_string);
        
        return yaml_string;
    }

    render () {
        return (<div>
                    <MainPanel scene={this.state.scene} update={this.update}/> 
                    <Map />
                </div>);
    }
}

ReactDOM.render(<Snapmap />,  document.getElementById('app'));

Map.init('https://tangrams.github.io/tangram-sandbox/styles/default.yaml');