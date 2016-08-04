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
                style_conf: {},
                style: 'none'
            },
            border: {
                enable: false,
                color: '#666',
                style_conf: {},
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
            kinds: {}
        },
        water: {
            fill: {
                enable: true,
                color: '#333',
                style_conf: {},
                style: 'none'
            },
            border: {
                enable: false,
                color: '#444',
                style_conf: {},
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
            kinds: {}
        },
        boundaries: {
            fill: {
                enable: true,
                color: '#111',
                style_conf: {},
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                }
            },
            border: {
                enable: false,
                color: '#FFF',
                style_conf: {},
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
            kinds: {}
        },
        landuse: {
            fill: {
                enable: true,
                color: '#666',
                style_conf: {},
                style: 'none'
            },
            border: {
                enable: false,
                color: '#777',
                style_conf: {},
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
            kinds: {}
        },
        buildings: {
            fill: {
                enable: true,
                color: '#999',
                style_conf: {},
                style: 'none'
            },
            border: {
                enable: false,
                color: '#AAA',
                style_conf: {},
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
            kinds: {}
        },
        roads: {
            fill: {
                enable: true,
                color: '#AAA',
                style_conf: {},
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                }
            },
            border: {
                enable: false,
                color: '#222',
                style_conf: {},
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
            kinds: {}
        },
        transit: {
            fill: {
                enable: false,
                color: '#888',
                style_conf: {},
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                }
            },
            border: {
                enable: false,
                color: '#AAA',
                style_conf: {},
                style: 'none',
                width: { 
                    value: 1,
                    unit: 'px'
                }
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
            kinds: {}
        },
        places: {
            fill: {
                enable: false,
                color: '#FFF',
                style_conf: {},
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                }
            },
            border: {
                enable: false,
                color: '#000',
                style_conf: {},
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                }
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
            kinds: {}
        },
        pois: {
            fill: {
                enable: false,
                color: '#FFF',
                style_conf: {},
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                }
            },
            border: {
                enable: false,
                color: '#000',
                style_conf: {},
                style: 'none',
                size: { 
                    value: 1,
                    unit: 'px'
                }
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
            kinds: {}
        }
    }
};
