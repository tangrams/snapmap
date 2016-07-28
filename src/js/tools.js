import { STYLES, LAYERS_TEMPLATE, DEFAULT_SCENE, STYLE_BLOCKS } from './const';

export function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

export function createObjectURL (string) {
    let create = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL); // for Safari compatibliity
    return create(new Blob([string]));
}

export function dumpStyle(type, template, config, imports) {
    let rta = {};
    
    if (type === 'label') {
        rta['style'] = 'text';
        rta['font'] = {
            fill: config[type].color,
            size: config[type].size.value.toString() + config[type].size.unit
        };
    } else {
        let base_style = template[type].style;

        rta = { 
            style: base_style,
            order: template[type].order, 
            color: config[type].color 
        }

        if (config[type].style !== 'none') {
            rta.style = base_style + '-' + config[type].style;

            if (STYLE_BLOCKS[base_style][config[type].style]) {
                let url = STYLE_BLOCKS[base_style][config[type].style].url;
                if (url && url !== '') {
                    if (imports.indexOf(url) === -1 ) {
                        imports.push(url);
                    }
                }
            }
        }

        if (base_style === 'lines') {
            rta['width'] = config[type].width.value.toString() + config[type].width.unit;
        } else if (base_style === 'points') {
            rta['size'] = config[type].size.value.toString() + config[type].size.unit;
        }
    }

    return rta;
}