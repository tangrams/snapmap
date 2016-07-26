export function mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
        return callback(key, object[key]);
    });
}

export function createObjectURL (string) {
    let create = (window.URL && window.URL.createObjectURL) || (window.webkitURL && window.webkitURL.createObjectURL); // for Safari compatibliity
    return create(new Blob([string]));
}