import 'whatwg-fetch';
import yaml from 'js-yaml';

export function getBlockSetup(name, url, callback) {
    fetch(url)
        .then(function(response) {
            return response.text();
        }).then(function(data) {
            let block = yaml.load(data);
            let rta = {};

            if (block && block.styles && block.styles[name] && block.styles[name].ui) {
                let properties = block.styles[name].ui;
                for (let prop in properties) {
                    if (block.styles[name].shaders.defines[prop]) {
                        rta[prop] = properties[prop];
                        rta[prop]['value'] = block.styles[name].shaders.defines[prop];
                    }   
                }
            }

            callback(rta)
        }).catch(function(ex) {
            console.log('Block parsing failed', ex);
        })
}
