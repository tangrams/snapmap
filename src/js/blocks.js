import 'whatwg-fetch';
import yaml from 'js-yaml';

/*

This file contains all the functions and data to add and deal with Tangram Blocks.
https://github.com/tangrams/blocks

*/

export const STYLE_BLOCKS = { 
    polygons: {
        'none': {
            url: ''
        },
        'diagonal-grid': {
            url: 'https://tangrams.github.io/blocks/polygons/diagonal-grid.yaml'
        },
        'diagonal-stripes': {
            url: 'https://tangrams.github.io/blocks/polygons/diagonal-stripes.yaml'
        },
        'dots': {
            url: 'https://tangrams.github.io/blocks/polygons/dots.yaml'
        },
        'pixelate': {
            url: 'https://tangrams.github.io/blocks/polygons/pixelate.yaml'
        },
        'shimmering': {
            url: 'https://tangrams.github.io/blocks/polygons/shimmering.yaml'
        },
        'stripes': {
            url: 'https://tangrams.github.io/blocks/polygons/stripes.yaml'
        }
    }, 
    lines : {
        'none': {
            url: ''
        },
        'chevron': {
            url: 'https://tangrams.github.io/blocks/lines/chevron.yaml'
        },
        'dash': {
            url: 'https://tangrams.github.io/blocks/lines/dash.yaml'
        },
        'dots': {
            url: 'https://tangrams.github.io/blocks/lines/dots.yaml'
        },
        'glow': {
            url: 'https://tangrams.github.io/blocks/lines/glow.yaml'
        },
        'outline': {
            url: 'https://tangrams.github.io/blocks/lines/outline.yaml'
        },
        'rainbow': {
            url: 'https://tangrams.github.io/blocks/lines/rainbow.yaml'
        },
        'stripes': {
            url: 'https://tangrams.github.io/blocks/lines/stripes.yaml'
        }
    }, 
    points: {
        'none': {
            url: ''
        },
        'cross': {
            url: 'https://tangrams.github.io/blocks/points/cross.yaml'
        },
        'shape': {
            url: 'https://tangrams.github.io/blocks/points/shape.yaml'
        }
    }, 
    text: {}
};

export const FILTER_BLOCKS = {
    'grain': {
        url: 'https://tangrams.github.io/blocks/filter/grain.yaml'
    },
    'grid': {
        url: 'https://tangrams.github.io/blocks/filter/grid.yaml'
    },
    'height': {
        url: 'https://tangrams.github.io/blocks/filter/height.yaml'
    },
    'lut': {
        url: 'https://tangrams.github.io/blocks/filter/lut.yaml'
    },
    'tv': {
        url: 'https://tangrams.github.io/blocks/filter/tv.yaml'
    }
};

export function parseBlock(category, name, callback) {
    let url;
    let rta = {};

    if (category === 'filter') {
        if (FILTER_BLOCKS[name]) {
            url = FILTER_BLOCKS[name].url;
        }
    }
    else {
        if (STYLE_BLOCKS[category] && STYLE_BLOCKS[category][name]) {
            url = STYLE_BLOCKS[category][name].url; 
        }
    }

    let block_name = category + '-' + name;

    if (url && url !== '') {
        fetch(url)
            .then(function(response) {
                return response.text();
            })
            .then(function(data) {
                let block = yaml.load(data);
                
                if (block && 
                    block.styles && 
                    block.styles[block_name] && 
                    block.styles[block_name].ui) {

                    // Populate defaults values
                    if (block.styles[block_name].ui.shaders) {
                        // For DEFINES
                        if (block.styles[block_name].ui.shaders.defines) {
                            let defines = block.styles[block_name].ui.shaders.defines;
                            for (let define in defines) {
                                if (block.styles[block_name].shaders.defines[define]) {
                                    block.styles[block_name].ui.shaders.defines[define]['value'] = block.styles[block_name].shaders.defines[define] || block.styles[block_name].ui.shaders.defines[define]['default_value'];
                                }   
                            }
                        }

                        // For UNIFORMS
                        if (block.styles[block_name].ui.shaders.uniforms) {
                            let uniforms = block.styles[block_name].ui.shaders.uniforms;
                            for (let uniform in uniforms) {
                                if (block.styles[block_name].shaders.uniforms[uniform]) {
                                    block.styles[block_name].ui.shaders.uniforms[uniform]['value'] = block.styles[block_name].shaders.uniforms[uniform] || block.styles[block_name].ui.shaders.uniforms[uniform]['default_value'];
                                }   
                            }
                        }
                    }
                }

                // take the structure of the UI block and copy it to the OBJ to return
                rta = block.styles[block_name].ui;
                
                callback(rta)
            })
            .catch(function(ex) {
                console.log('Block parsing failed', ex);
                callback(rta);
            })
    } 
    else {
        console.log('Block ', block_name, 'not found'); 
        callback(rta);
    }
}


// Construct a Style structer according to a template type and the config type
export function dumpStyleBlock (type, template, config, imports, filters) {    
    if (config[type].style && config[type].style !== 'none') {
        importBlock(STYLE_BLOCKS[template.style][config[type].style], imports);

        let rta = {
            base: template.style,
            mix: [template.style + '-' + config[type].style, ...filters]
        };

        if (config[type].style_conf && config[type].style_conf.shaders) {
            let shaders = getShaderBlock(config[type].style_conf);
            if (shaders) {
                rta['shaders'] = shaders;
            }
        }

        return rta;
    }
    else {
        if (filters.length > 0) {
            return {
                base: template.style,
                mix: filters
            }
        } 
        else {
            return undefined;
        }
    }
}

// Insert filters styles and imports together with the custom configuration
export function dumpFilterBlocks (filters, styles, imports) {
    let rta = [];
    for (let filter in filters) {
        let name = 'filter-'+filter;

        importBlock(FILTER_BLOCKS[filter], imports);

        let shaders = getShaderBlock(filters[filter]);
        if (shaders) {
            styles[name] = { shaders: shaders };
        }
        
        rta.push(name);
    }
    return rta;
}

function getUIValue(element) {
    let value = element.value || element.default_value;

    if (element.type === 'number' && parseFloat(value)) {
        return parseFloat(value);
    }
    else {
        return value;
    }
}

function getShaderBlock (block) {
    if (block.shaders) {
        let rta = {}

        // Extract defines values
        if (block.shaders.defines) {
            rta['defines'] = {};
            let defines = block.shaders.defines || {};
            for (let define in defines) {
                rta.defines[define] = getUIValue(defines[define]);
            }
        }

        // Extract uniform values
        if (block.shaders.uniforms) {
            rta['uniforms'] = {};
            let uniforms = block.shaders.uniforms || {};
            for (let uniform in uniforms) {
                rta.uniforms[uniform] = getUIValue(uniforms[uniform]);
            }
        }

        return rta;
    }
}

// If the block was a url and is new add it to the the imports
function importBlock(block, imports) {
    if (block && block.url && block.url !== '') {
        if (imports.indexOf(block.url) === -1 ) {
            imports.push(block.url);
        }
    }
}
