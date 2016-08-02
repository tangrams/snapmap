import React from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT_SCENE } from './const';
import { createObjectURL } from './tools';
import { dumpScene } from './parser';

// Main Components
import Map from './Map';
import MainPanel from './MainPanel';

class Snapmap extends React.Component {
    constructor (props) {
        super(props);

        this.state = { scene: DEFAULT_SCENE };

        this.load = this.load.bind(this);
        this.update = this.update.bind(this);
        this.erase = this.erase.bind(this);
    }

    load (scene) {
        window.scene.load(createObjectURL(dumpScene(scene || this.state.scene)));
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

        this.load();
    }

    erase (ev) {
        let address = ev.address.split(':');
        let newScene = this.state.scene;

        // TODO's:
        //  -   This is ridiculus, should be a better way to do this,
        //      If I only have pointers... 
        switch (address.length) {
            case 6:
                delete newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]];
                break;
            case 5:
                delete newScene[address[0]][address[1]][address[2]][address[3]][address[4]];
                break;
            case 4:
                delete newScene[address[0]][address[1]][address[2]][address[3]];
                break;
            case 3:
                delete newScene[address[0]][address[1]][address[2]];
                break;
            case 2:
                delete newScene[address[0]][address[1]];
                break;
            case 1: 
                delete newScene[address[0]];
                break;
            case 0:
                break;
        }

        this.setState({ scene: newScene });

        this.load();
    }

    render () {
        return (<div>
                    <MainPanel scene={this.state.scene} update={this.update} erase={this.erase}/> 
                    <Map />
                </div>);
    }
}

ReactDOM.render(<Snapmap/>,  document.getElementById('app'));

Map.init('./default.yaml');