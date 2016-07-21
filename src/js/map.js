import React from 'react';
import L from 'leaflet';
import 'leaflet-hash';
import Tangram from 'tangram';

// Declare these exports now, but Tangram is set up later.
export let tangramLayer = null;
export let tangramScene = null;
export const map = null;

class Map extends React.Component {
    static init(pathToSceneFile) {
        this.leaflet = L.map('map', {
            zoomControl: false,
            attributionControl: false,
            maxZoom: 24,
            keyboardZoomOffset: 0.05
        });

        // Create Leaflet map
        this.leaflet.setView([40.70531887544228, -74.00976419448853], 16);
        const hash = new L.Hash(this.leaflet);

        // Add Tangram Layer
        this.layer = Tangram.leafletLayer({
            scene: pathToSceneFile,
        });
        this.layer.addTo(this.leaflet);

        // Attach scene to export
        this.scene = this.layer.scene;

        // Export to window for debugging.
        window.layer = this.layer;
        window.scene = this.scene;
    }

    static load (pathToSceneFile, { reset = false, basePath = null } = {}) {
        if (!this.layer) {
            this.init(pathToSceneFile);
        }
        else {
            const path = basePath || this.scene.config_path;
            return this.scene.load(pathToSceneFile, !reset && path);
        }
    }

    render () {
        return (<div id='map'></div>
            );
    }
}

export default Map;
