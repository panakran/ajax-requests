const axios = require("axios");
const M = require("materialize-css");
const Utils = require("./utils.js");
const DomUtils = require("./dom.js");
const AcUtils = require("./autocomplete.js");
const ready = (fn) =>
    document.readyState !== 'loading'
            ? fn()
            : document.addEventListener('DOMContentLoaded', fn);

ready(() => {

    /** 
     * Initial global constants
     */
    const inputDOM = DomUtils.getInputElementsObj();
    const autoCompleteObject = AcUtils.getAcObject();
    let outputDOM = DomUtils.getOutputElementsObj();

    /**
     * Initialize method sets up the select dropdown
     */
    const initMethod = () => {
        AcUtils.init(inputDOM, M);
        M.FormSelect.init(inputDOM.selectElements);
    };



    /**
     * main render method we pass the object with new elements and values to render
     * we also pass success true/false to handle rendering for success/error request
     * @param {type} renderObj
     * @return {undefined}
     */
    const renderDOMValues = (response, finalRequestTime, success) => {
        const baseURL = inputDOM.baseURLElement.value;
        const url = inputDOM.urlElement.value;

        DomUtils.renderNewInnerHTML(outputDOM.timerElement, Utils.createTimerText(finalRequestTime));
        AcUtils.addToBaseUrl(baseURL);
        AcUtils.addToUrl(url);
        if (success) {
            DomUtils.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.headers));
            DomUtils.renderNewValue(outputDOM.responseElementB, Utils.stringifyJSON(response.data));
        } else {
            Utils.printErrorMessage(M.toast, response);
        }
    };


    /**
     * on click submit button 
     * 1. we prepare the axios config
     * 2. on response we call renderDOM to update view
     * @return {undefined}
     */
    initMethod();
    inputDOM.requestElement.onclick = () => {
        /**
         * Getting DOM elements input values
         */

        const axiosConfig = DomUtils.readDOMValues(inputDOM);
        console.log("REQUEST::", axiosConfig);
        const startTime = performance.now();
        axios(axiosConfig)
                .then((response) => renderDOMValues(response, Utils.getExecTime(startTime), true))
                .catch((error) => renderDOMValues(error, Utils.getExecTime(startTime), false));
    };
});