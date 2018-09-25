let autocompleteinstanceBaseUrl;
let autocompleteinstanceUrl;
const AcUtils = {
    init: (inputDOM, M) => {
        autocompleteinstanceBaseUrl = M.Autocomplete.init(inputDOM.baseURLElement);
        autocompleteinstanceUrl = M.Autocomplete.init(inputDOM.urlElement);
    },

    /**
     * adds a new object to autocomplete element
     * @param {type} instance
     * @param {type} newElement
     */
    addToBaseUrl: (newElement) => {
        autocompleteinstanceBaseUrl.updateData({...autocompleteinstanceBaseUrl.options.data, [newElement]: null});
    },

    addToUrl: (newElement) => {
        autocompleteinstanceUrl.updateData({...autocompleteinstanceUrl.options.data, [newElement]: null});
    },

    getAcObject: () => {
        return {autocompleteinstanceBaseUrl, autocompleteinstanceUrl};
    }

//    return {init, addToBaseUrl, addToUrl, getAcObject};
};
export {AcUtils}
//module.exports = AcUtils();