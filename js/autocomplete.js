const AcUtils = () => {
    let autocompleteinstanceBaseUrl;
    let autocompleteinstanceUrl;
    const init = (inputDOM, M) => {
        autocompleteinstanceBaseUrl = M.Autocomplete.init(inputDOM.baseURLElement);
        autocompleteinstanceUrl = M.Autocomplete.init(inputDOM.urlElement);
    };

    /**
     * adds a new object to autocomplete element
     * @param {type} instance
     * @param {type} newElement
     */
    const addToBaseUrl = (newElement) =>
        autocompleteinstanceBaseUrl.updateData({...autocompleteinstanceBaseUrl.options.data, [newElement]: null});
        
    const addToUrl = (newElement) =>
        autocompleteinstanceUrl.updateData({...autocompleteinstanceUrl.options.data, [newElement]: null});

    const getAcObject = () => {
        return {autocompleteinstanceBaseUrl, autocompleteinstanceUrl};
    };

    return {init, addToBaseUrl, addToUrl, getAcObject};
};

module.exports = AcUtils();