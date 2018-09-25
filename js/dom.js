import{
BASE_URL_SELECTOR,
        URL_SELECTOR,
        RESPONSE_HEADER_SELECTOR,
        RESPONSE_BODY_SELECTOR,
        EXEC_TIME_SELECTOR,
        HEADERS_SELECTOR,
        BODY_SELECTOR,
        METHODS_SELECTOR,
        SELECT_TAG_SELECTOR,
        REQUEST_SELECTOR,
        STATUS_SELECTOR,
        ERROR_STATUS_CLASS,
        SUCCESS_STATUS_CLASS
} from "./constants.js";
import {Utils} from "./utils.js";

const DomUtils = {
    getInputElementsObj: () => {
        return {
            selectElements: document.querySelectorAll(SELECT_TAG_SELECTOR),
            methodElement: document.getElementById(METHODS_SELECTOR),
            baseURLElement: document.getElementById(BASE_URL_SELECTOR),
            urlElement: document.getElementById(URL_SELECTOR),
            headersElement: document.getElementById(HEADERS_SELECTOR),
            bodyElement: document.getElementById(BODY_SELECTOR),
            requestElement: document.getElementById(REQUEST_SELECTOR),
            statusElement: document.getElementById(STATUS_SELECTOR)
        };
    },
    getOutputElementsObj: () => {
        return {
            responseElementH: document.getElementById(RESPONSE_HEADER_SELECTOR),
            responseElementB: document.getElementById(RESPONSE_BODY_SELECTOR),
            timerElement: document.getElementById(EXEC_TIME_SELECTOR),
            statusElement: document.getElementById(STATUS_SELECTOR)
        };
    },

    readDOMValues: (inputDOM) => {

        const method = inputDOM.methodElement.options[inputDOM.methodElement.selectedIndex].text;
        const baseURL = inputDOM.baseURLElement.value;
        const url = inputDOM.urlElement.value;
        const headers = Utils.parseJSON(inputDOM.headersElement.value);
        const data = Utils.parseJSON(inputDOM.bodyElement.value);
        return {method, url, baseURL, data, headers};
    },

    /**
     * render new value to innerHTML
     * @param {type} element
     * @param {type} newValue
     */
    renderNewInnerHTML: (element, newValue) => {
        element.innerHTML = newValue;
    },

    /**
     * render new value to value
     * @param {type} element
     * @param {type} newValue
     */
    renderNewValue: (element, newValue) => {
        element.value = newValue;
    },
    /**
     * render new status and apply classes
     * @param {type} element
     * @param {type} newValue
     */
    addClassAndRender: function(element, newValue, newClassesToApply) {
        element.classList.add(...newClassesToApply);
        this.renderNewInnerHTML(element, Utils.createStatusText(newValue));
    },
    /**
     * render new value to value
     * @param {type} element
     * @param {type} newValue
     */
    renderStatusTag: function(element, newValue) {
        element.classList = [];
        newValue < 400
                ? this.addClassAndRender(element, newValue, SUCCESS_STATUS_CLASS)
                : this.addClassAndRender(element, newValue, ERROR_STATUS_CLASS);
    }

//    return {getInputElementsObj, getOutputElementsObj, readDOMValues, renderNewInnerHTML, renderNewValue, renderStatusTag};
};

export {DomUtils}
//module.exports = DomUtils();