import 'whatwg-fetch';
import yaml from 'js-yaml';

export function getBlockSetup(name, url, callback) {
    fetch(url)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            let block = yaml.load(data);
            let rta = {};

            if (block && 
                block.styles && 
                block.styles[name] && 
                block.styles[name].ui) {

                // take the structure of the UI block and copy it to the OBJ to return
                rta = block.styles[name].ui;

                // Populate defaults values
                if (block.styles[name].ui.shaders) {
                    // For DEFINES
                    if (block.styles[name].ui.shaders.defines) {
                        let defines = block.styles[name].ui.shaders.defines;
                        for (let define in defines) {
                            if (block.styles[name].shaders.defines[define]) {
                                block.styles[name].ui.shaders.defines[define]['value'] = block.styles[name].shaders.defines[define];
                            }   
                        }
                    }

                    // For UNIFORMS
                    if (block.styles[name].ui.shaders.uniforms) {
                        let uniforms = block.styles[name].ui.shaders.uniforms;
                        for (let uniform in uniforms) {
                            if (block.styles[name].shaders.uniforms[uniform]) {
                                block.styles[name].ui.shaders.uniforms[uniform]['value'] = block.styles[name].shaders.uniforms[uniform];
                            }   
                        }
                    }
                }
            }
            
            callback(rta)
        }).catch(function(ex) {
            console.log('Block parsing failed', ex);
        })
}
