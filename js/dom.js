const Constants = require("./constants");
const Utils = require("./utils.js");

const DomUtils = () => {
    const getInputElementsObj = () => {
        return {
            selectElements: document.querySelectorAll(Constants.SELECT_TAG_SELECTOR),
            methodElement: document.getElementById(Constants.METHODS_SELECTOR),
            baseURLElement: document.getElementById(Constants.BASE_URL_SELECTOR),
            urlElement: document.getElementById(Constants.URL_SELECTOR),
            headersElement: document.getElementById(Constants.HEADERS_SELECTOR),
            bodyElement: document.getElementById(Constants.BODY_SELECTOR),
            requestElement: document.getElementById(Constants.REQUEST_SELECTOR)
        };
    };
    const getOutputElementsObj = () => {
        return {
            responseElementH: document.getElementById(Constants.RESPONSE_HEADER_SELECTOR),
            responseElementB: document.getElementById(Constants.RESPONSE_BODY_SELECTOR),
            timerElement: document.getElementById(Constants.EXEC_TIME_SELECTOR)
        };
    };

    const readDOMValues = (inputDOM) => {

        const method = inputDOM.methodElement.options[inputDOM.methodElement.selectedIndex].text;
        const baseURL = inputDOM.baseURLElement.value;
        const url = inputDOM.urlElement.value;
        const headers = Utils.parseJSON(inputDOM.headersElement.value);
        const data = Utils.parseJSON(inputDOM.bodyElement.value);
        return {method, url, baseURL, data, headers};
    };

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

    return {getInputElementsObj, getOutputElementsObj, readDOMValues, renderNewInnerHTML, renderNewValue};
};

module.exports = DomUtils();