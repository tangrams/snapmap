import { STYLES, LAYERS_TEMPLATE, DEFAULT_SCENE, STYLE_BLOCKS, FILTER_BLOCKS } from './const';

export function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

export function createObjectURL (string) {
    let create = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL); // for Safari compatibliity
    return create(new Blob([string]));
}


// Construct a Layer structer according to a template type and the config type
// type: ['fill', 'border', 'label']
export function dumpLayer(type, template, config, filters) {
    let rta = {};
    let base_style = template[type].style;

    if (type === 'label') {
        rta['font'] = {
            fill: config[type].color,
            size: config[type].size.value.toString() + config[type].size.unit
        };
    }
    else {
        rta = { 
            order: template[type].order, 
            color: config[type].color 
        }
        if (base_style === 'lines') {
            rta['width'] = config[type].width.value.toString() + config[type].width.unit;
        }
        else if (base_style === 'points') {
            rta['size'] = config[type].size.value.toString() + config[type].size.unit;
        }
    }

    // If there is no filter... and custom styles specify the base_style (text, points, lines or polygons ) as style
    if ((filters.length === 0) && (!config[type].style || config[type].style === 'none')) {
        rta['style'] = base_style;
    }

    return rta;
}

// Construct a Style structer according to a template type and the config type
// type ['fill', 'border', 'label']
export function dumpStyle(type, template, config, imports, filters) {
    let base_style = template[type].style;
    
    if (config[type].style && config[type].style !== 'none') {
        if (STYLE_BLOCKS[base_style][config[type].style]) {
            let url = STYLE_BLOCKS[base_style][config[type].style].url;
            if (url && url !== '') {
                if (imports.indexOf(url) === -1 ) {
                    imports.push(url);
                }
            }
        }

        let rta = {
            base: template[type].style,
            mix: [base_style + '-' + config[type].style, ...filters]
        };

        // TODO:
        // - custom STYLE step up
        return rta;
    }
    else {
        if (filters.length > 0) {
            return {
                base: template[type].style,
                mix: filters
            }
        } 
        else {
            return undefined;
        }
    }
}

// Insert filters styles and imports together with the custom configuration
export function dumpFilters(filters, styles, imports) {
    let rta = [];
    for (let filter in filters) {
        let jsonCnf = filters[filter];

        if (FILTER_BLOCKS[filter]) {
            let url = FILTER_BLOCKS[filter].url;
            if (url && url !== '') {
                if (imports.indexOf(url) === -1 ) {
                    imports.push(url);
                }
            }
        }

        // TODO:
        // - custom FILTER step up
        
        rta.push('filter-'+filter);
    }
    return rta;
}