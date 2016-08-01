
export const VECTOR_SOURCE_NAME = '_mapzen';
export const VECTOR_SOURCE_TYPE = 'TopoJSON';
export const VECTOR_SOURCE_API_KEY = 'vector-tiles-6JqNSxo';
export const VECTOR_SOURCE_URL = 'https://vector.mapzen.com/osm/all/{z}/{x}/{y}.topojson';

export const STYLES = ['polygons', 'lines', 'points', 'text', 'raster'];
export const TEMPLATES = ['fill', 'border', 'label'];
export const CAMERA_TYPES = ['perspective', 'isometric'];
export const LIGHT_TYPES = ['directional', 'point', 'spot'];

export const LAYERS_TEMPLATE = {
    water: {
        fill: {
            style: 'polygons',
            order: 'global.order'
        },
        border: {
            style: 'lines',
            order: 'global.order-top'
        },
        label: {
            style: 'text'
        }
    }, 
    earth: {
        fill: {
            style: 'polygons',
            order: 'global.order'
        },
        border: {
            style: 'lines',
            order: 'global.order-top'
        },
        label: {
            style: 'text'
        }
    }, 
    boundaries: {
        fill: {
            style: 'lines',
            order: 'global.order-top'
        },
        border: {
            style: 'lines',
            order: 'global.order'
        },
        label: {
            style: 'text'
        }
    },
    landuse: {
        fill: {
            style: 'polygons',
            order: 'global.order'
        },
        border: {
            style: 'lines',
            order: 'global.order-top'
        },
        label: {
            style: 'text'
        }
    }, 
    buildings: {
        fill: {
            style: 'polygons',
            order: 'global.order'
        },
        border: {
            style: 'lines',
            order: 'global.order-top'
        },
        label: {
            style: 'text'
        }
    },  
    roads: {
        fill: {
            style: 'lines',
            order: 'global.order-top'
        },
        border: {
            style: 'lines',
            order: 'global.order'
        },
        label: {
            style: 'text'
        }
    },
    transit: {
        fill: {
            style: 'lines',
            order: 'global.order-top'
        },
        border: {
            style: 'lines',
            order: 'global.order'
        },
        label: {
            style: 'text'
        }
    },
    places: {
        fill: {
            style: 'points',
            order: 'global.order-top'
        },
        border: {
            style: 'points',
            order: 'global.order'
        },
        label: {
            style: 'text'
        }
    },
    pois: {
        fill: {
            style: 'points',
            order: 'global.order-top'
        },
        border: {
            style: 'points',
            order: 'global.order'
        },
        label: {
            style: 'text'
        }
    }
};

export const DEFAULT_SCENE = {
    import: [ 'https://tangrams.github.io/blocks/global.yaml' ],
    sources: { 
        vector_tiles: {
            type: VECTOR_SOURCE_TYPE, 
            url: VECTOR_SOURCE_URL + '?api_key=' + VECTOR_SOURCE_API_KEY
        } 
    },
    camera: { 
        type: 'perspective' 
    },
    light: {
        type: 'directional',
        direction: [.1, .5, -1],
        ambient: '#878886',
        diffuse: '#BFC1BE'
    },
    filters: {

    },
    layers: {
        earth: {
            fill: {
                enable: true,
                color: '#555',
                style: 'none'
            },
            border: {
                enable: false,
                color: '#666',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        water: {
            fill: {
                enable: true,
                color: '#333',
                style: 'none'
            },
            border: {
                enable: false,
                color: '#444',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        boundaries: {
            fill: {
                enable: true,
                color: '#111',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            border: {
                enable: false,
                color: '#FFF',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        landuse: {
            fill: {
                enable: true,
                color: '#666',
                style: 'none'
            },
            border: {
                enable: false,
                color: '#777',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        buildings: {
            fill: {
                enable: true,
                color: '#999',
                style: 'none'
            },
            border: {
                enable: false,
                color: '#AAA',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            extrude: true,
            filters: []
        },
        roads: {
            fill: {
                enable: true,
                color: '#AAA',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            border: {
                enable: false,
                color: '#222',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        transit: {
            fill: {
                enable: false,
                color: '#888',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            border: {
                enable: false,
                color: '#AAA',
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        places: {
            fill: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            border: {
                enable: false,
                color: '#000',
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        },
        pois: {
            fill: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            border: {
                enable: false,
                color: '#000',
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                },
                style: 'none'
            },
            label: {
                enable: false,
                color: '#FFF',
                size: { 
                    value: 16,
                    unit: 'px'
                },
                family: 'helvetica',
                weight: 100
            },
            filters: []
        }
    }
};

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
        'glass-walls': {
            url: 'https://tangrams.github.io/blocks/polygons/glass-walls.yaml'
        },
        'pixelate': {
            url: 'https://tangrams.github.io/blocks/polygons/pixelate.yaml'
        },
        'shimmering': {
            url: 'https://tangrams.github.io/blocks/polygons/shimmering.yaml'
        },
        'stripes': {
            url: 'https://tangrams.github.io/blocks/polygons/stripes.yaml'
        },
        'windows': {
            url: 'https://tangrams.github.io/blocks/polygons/windows.yaml'
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
    'hatch': {
        url: 'https://tangrams.github.io/blocks/filter/hatch.yaml'
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

export const FILTERS_LUTS = {
    xPro: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0001.png'
    },
    Walden: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0002.png'
    },
    Toaster: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0003.png'
    },
    Sutro: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0004.png'
    },
    Nashville: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0005.png'
    },
    LordKelvin: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0006.png'
    },
    LomoFi: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0007.png'
    },
    InkWell: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0008.png'
    },
    Hefe: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0009.png'
    },
    Gotham: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0010.png'
    },
    EarlyBird: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0011.png'
    },
    Brannan: {
        url: 'https://tangrams.github.io/blocks/filter/imgs/lut-0013.png'
    },
}