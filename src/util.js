export function findProp(obj, prop) {

    var result = [];
    let path = []
    function recursivelyFindProp(o, keyToBeFound) {
        Object.keys(o).forEach(function (key) {
            if (key === keyToBeFound) {
                result.push({ [keyToBeFound]: o[key], path: path });
            }
            else if (typeof o[key] === 'object') {
                recursivelyFindProp(o[key], keyToBeFound, path.push(key));
            }
        });
    }
    recursivelyFindProp(obj, prop);

    console.log('====================================');
    console.log({ result });
    console.log('====================================');

    return result;
}