import yaml from 'js-yaml';
import { TEMPLATES, LAYERS_TEMPLATE, STYLE_BLOCKS, FILTER_BLOCKS } from './const';

const VECTOR_SOURCE_NAME = '_mapzen';
const CAMERA_NAME = '_camera';
const LIGHT_NAME = 'light';

// Take a JS Object w the `scene` configuration and return YAML string to pass to tangram
export function dumpScene (scene) {

    // YAML options
    // ----------------------------------------
    let options = {
        indent: 4,      // 4 spaces of indentation
        noRefs: true    // no references or anchors (keep it humanly readable)
    };

    // Tamgram scene logical structure 
    // ----------------------------------------

    // Array of TangramBlocks to IMPORTS
    let imports = [...scene.import];

    // SOURCES
    let sources = {};
    sources[VECTOR_SOURCE_NAME] = scene.sources.vector_tiles;

    // CAMERAS
    let cameras = {};
    cameras[CAMERA_NAME] = scene.camera;

    // LIGHTS
    let lights = {};
    lights[LIGHT_NAME] = scene.light;

    // LAYERS
    let layers = {}; // Layers

    // STYLES
    let styles = {}; // Custom styles for layers that need it
    let filters = dumpFilters(scene.filters, styles, imports);

    // For each layer...
    for (let layer in scene.layers) {

        //  ...construct a new JS Object in the right yaml-tamgram 'like' format
        let jsonCnf = scene.layers[layer];
        let yamlCnf = {
            data: { source: VECTOR_SOURCE_NAME },
            draw: { }
        }

        //  Each layer can have three different templates (fill, border or label)
        for (let template of TEMPLATES) {
            // If is enabled 
            if (jsonCnf[template].enable) {
                // layer name use for the sub layer and custom style if needed
                let lyr_name = '_'+layer+'_'+template;

                // Construct the layer draw properties 
                yamlCnf.draw[lyr_name] = dumpDraw(template, LAYERS_TEMPLATE[layer][template], jsonCnf, filters);

                // Construct the custom style properties if needed
                let style = dumpStyle(template, LAYERS_TEMPLATE[layer][template], jsonCnf, imports, filters);
                if (style) {
                    styles[lyr_name] = style;
                }

                // Buildings could be extrude
                if (layer === 'buildings' && jsonCnf.extrude) {
                    yamlCnf.draw[lyr_name]['extrude'] = true;
                }
            }
        }

        layers[layer] = yamlCnf;
    }

    // Tamgram scene logical structure 
    // ----------------------------------------

    let yaml_string = "";
    yaml_string += yaml.safeDump( { import: imports }, options);
    yaml_string += yaml.safeDump( { sources: sources }, options);
    yaml_string += yaml.safeDump( { cameras: cameras }, options);
    yaml_string += yaml.safeDump( { lights: lights }, options);
    yaml_string += yaml.safeDump( { layers: layers }, options);

    if (Object.keys(styles).length !== 0) {
        yaml_string += yaml.safeDump( { styles: styles }, options);
    }
    
    if (scene.layers.water.fill.enable) {
        yaml_string += yaml.safeDump( { scene: { background: { color: scene.layers.water.fill.color } } }, options);
    } else if (scene.layers.earth.fill.enable) {
        yaml_string += yaml.safeDump( { scene: { background: { color: scene.layers.earth.fill.color } } }, options);
    }

    return yaml_string;
}

// Construct a Draw structer according to a template type ( 'fill', 'border' or 'label') and the right config
function dumpDraw (type, template, config, filters) {
    let rta = {};

    // Labels have a very different structure
    if (type === 'label') {
        // The config defines color, size and others
        rta['font'] = {
            fill: config[type].color,
            size: config[type].size.value.toString() + config[type].size.unit
        };

        // TODO: 
        //  - Add fonts
    }
    else {

        // Common properties for points, lines and polygons
        rta = { 
            order: template.order,    // The order is provided by the template
            color: config[type].color       // The color comes from the config
        }

        // Depending on the base style some other properties
        if (template.style === 'lines') {
            rta['width'] = config[type].width.value.toString() + config[type].width.unit;
        }
        else if (template.style === 'points') {
            rta['size'] = config[type].size.value.toString() + config[type].size.unit;
        }
    }

    // If there is no filter apply to all the styles and no custom style is set. We need to define the base style on the draw (text, points, lines or polygons )
    if ((filters.length === 0) && (!config[type].style || config[type].style === 'none')) {
        // Use the custom style instead of the base style.
        rta['style'] = template.style;
    }

    return rta;
}

// Construct a Style structer according to a template type and the config type
function dumpStyle (type, template, config, imports, filters) {    
    if (config[type].style && config[type].style !== 'none') {
        importBlock(STYLE_BLOCKS[template.style][config[type].style], imports);

        let rta = {
            base: template.style,
            mix: [template.style + '-' + config[type].style, ...filters]
        };

        // TODO:
        // - custom STYLE step up
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
function dumpFilters (filters, styles, imports) {
    let rta = [];
    for (let filter in filters) {
        let name = 'filter-'+filter;

        importBlock(FILTER_BLOCKS[filter], imports);

        if (!styles[name]) {
            styles[name] = { 
                shaders: { 
                    uniforms: {}, 
                    defines: {} 
                } 
            };            
        } 
       
        if (filters[filter].shaders) {
            let defines = filters[filter].shaders.defines || {};
            for (let define in defines) {
                if (defines[define].type === 'number' && parseFloat(defines[define].value)) {
                    styles[name].shaders.defines[define] = parseFloat(defines[define].value);
                }
                else {
                    styles[name].shaders.defines[define] = defines[define].value;
                }
            }

            let uniforms = filters[filter].shaders.uniforms || {};
            for (let uniform in uniforms) {
                if (uniforms[uniform].type === 'number' && parseFloat(uniforms[uniform].value)) {
                    styles[name].shaders.uniforms[uniform] = parseFloat(uniforms[uniform].value);
                }
                else {
                    styles[name].shaders.uniforms[uniform] = uniforms[uniform].value;
                }
            }
        }
        
        rta.push(name);
    }
    return rta;
}

// If the block was a url and is new add it to the the imports
function importBlock(block, imports) {
    if (block && block.url && block.url !== '') {
        if (imports.indexOf(block.url) === -1 ) {
            imports.push(block.url);
        }
    }
}