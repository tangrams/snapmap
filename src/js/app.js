import React from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT_SCENE } from './const';
import { createObjectURL } from './tools';
import { dumpScene } from './parser';
import { saveAs } from './vendor/FileSaver.min.js';

// Main Components
import Map from './Map';
import MainPanel from './MainPanel';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class Snapmap extends React.Component {
    constructor (props) {
        super(props);

        this.state = { scene: DEFAULT_SCENE };

        this.newStyle = this.newStyle.bind(this);
        this.loadStyle = this.loadStyle.bind(this);
        this.export = this.export.bind(this);
        this.update = this.update.bind(this);
        this.erase = this.erase.bind(this);
    }

    newStyle () {
        this.loadStyle(DEFAULT_SCENE);
    }

    loadStyle (scene) {
        this.setState({ scene: scene });
        window.scene.load(createObjectURL(dumpScene(scene || this.state.scene)));
    }

    export () {
        const typedArray = dumpScene(this.state.scene);
        const blob = new Blob([typedArray], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'scene.yaml');
    }

    update (ev) {
        let address = ev.address.split(':');
        let newScene = this.state.scene;

        // TODO's:
        //  -   This is ridiculus, should be a better way to do this,
        //      If I only have pointers... 
        switch (address.length) {
            case 10:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]][address[6]][address[7]][address[8]][address[9]] = ev.value;
                break;
            case 9:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]][address[6]][address[7]][address[8]] = ev.value;
                break;
            case 8:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]][address[6]][address[7]] = ev.value;
                break;
            case 7:
                newScene[address[0]][address[1]][address[2]][address[3]][address[4]][address[5]][address[6]] = ev.value;
                break;
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
        this.loadStyle(newScene);
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
        
        this.loadStyle(newScene);
    }

    render () {
        return (<div>
                    <MainPanel scene={this.state.scene} update={this.update} erase={this.erase}>
                        <Button bsStyle='default'
                            onClick={this.newStyle}>
                            <Glyphicon glyph='file'/>
                        </Button>
                        <Button bsStyle='default'
                            onClick={this.export}>
                            <Glyphicon glyph='download-alt'/>
                        </Button>
                    </MainPanel>
                    <Map />
                </div>);
    }
}

ReactDOM.render(<Snapmap/>,  document.getElementById('app'));

Map.init('./default.yaml');