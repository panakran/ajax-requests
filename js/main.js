import 'materialize-css/dist/css/materialize.css';
import 'materialize-css';
const axios = require("axios");
const M = require("materialize-css");
const Utils = require("./utils.js");
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function () {

    /** 
     * Initial global constants
     */
    const selectElem = document.querySelectorAll('select');
    const baseURL = document.getElementById("baseurl");
    const url = document.getElementById("url");
    const autocompleteinstanceBaseUrl = M.Autocomplete.init(baseURL);
    const autocompleteinstanceUrl = M.Autocomplete.init(url);

    /**
     * Initialize method sets up the select dropdown
     */
    const initMethod = () => M.FormSelect.init(selectElem);



    /**
     * main render method we pass the object with new elements and values to render
     * we also pass success true/false to handle rendering for success/error request
     * @param {type} renderObj
     * @return {undefined}
     */
    const renderDOM = (response, finalRequestTime, success) => {
        const baseURL = document.getElementById("baseurl").value;
        const url = document.getElementById("url").value;

        let responseElementH = document.getElementById("responseH");
        let responseElementB = document.getElementById("responseB");
        let timerElement = document.getElementById("executiontime");


        Utils.renderNewInnerHTML(timerElement, Utils.createTimerText(finalRequestTime));
        Utils.addToAutocompleteInstance(autocompleteinstanceBaseUrl, baseURL);
        Utils.addToAutocompleteInstance(autocompleteinstanceUrl, url);
        if (success) {
            Utils.renderNewValue(responseElementH, Utils.stringifyJSON(response.headers));
            Utils.renderNewValue(responseElementB, Utils.stringifyJSON(response.data));
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
    document.getElementById("req").onclick = () => {
        /**
         * Getting DOM elements input values
         */
        const methodElement = document.getElementById("methods");
        const method = methodElement.options[methodElement.selectedIndex].text;
        const baseURL = document.getElementById("baseurl").value;
        const url = document.getElementById("url").value;
        const headersElement = document.getElementById("headers");
        const bodyElement = document.getElementById("body");
        const data = Utils.parseJSON(bodyElement.value);
        const headers = Utils.parseJSON(headersElement.value);
        const axiosConfig = {method, url, baseURL, data, headers};

        console.log("REQUEST::", axiosConfig);
        const startTime = performance.now();

        axios(axiosConfig)
                .then((response) => renderDOM(response, Utils.getExecTime(startTime), true))
                .catch((error) => renderDOM(error, Utils.getExecTime(startTime), false));
    };
});