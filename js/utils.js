const Utils = () => {

    /**
     * Executes a funciton passed with its params if exeption throwed return the first param passed
     * @param {type} func
     * @param {type} params
     * @return {unresolved}
     */
    const catchJsonException = (func, ...params) => {
        try {
            return func(...params);
        } catch (e) {
            return params;
        }
    };

    /**
     * Executes native JSON.stringify but with error catching
     * @param {type} value
     */
    const stringifyJSON = (value) => catchJsonException(JSON.stringify, value, undefined, 4);

    /**
     * Executes native JSON.parse but with error catching
     * @param {type} value
     */
    const parseJSON = (value) => catchJsonException(JSON.parse, value);



    /**
     * render new value to innerHTML
     * @param {type} element
     * @param {type} newValue
     */
    const renderNewInnerHTML = (element, newValue) =>
        element.innerHTML = newValue;

    /**
     * render new value to value
     * @param {type} element
     * @param {type} newValue
     */
    const renderNewValue = (element, newValue) =>
        element.value = newValue;

    /**
     * adds a new object to autocomplete element
     * @param {type} instance
     * @param {type} newElement
     */
    const addToAutocompleteInstance = (instance, newElement) =>
        instance.updateData({...instance.options.data, [newElement]: null});
    /**
     * prints error messages to DOM through passed func
     * @param {type} msgFunc
     * @param {type} msg
     */
    const printErrorMessage = (msgFunc, msg) =>
        msgFunc({classes: "rounded card-panel red white-text text-darken-4 z-depth-5", html: `<p><code>${msg}</code></p>`});

    /**
     * create text that will render to timer element
     * @param {type} time
     * @return {String}
     */
    const createTimerText = (time) =>
        (time).toFixed(2) + "ms";

    /**
     * calculate exec time based on start and end time(simple sub)
     * @param {type} endT
     * @param {type} startT
     * @return {Number}
     */
    const getExecTime = (startT) => performance.now() - startT;

    return {stringifyJSON, parseJSON, renderNewInnerHTML, renderNewValue, addToAutocompleteInstance, printErrorMessage, createTimerText, getExecTime};
};
module.exports = Utils();