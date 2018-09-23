import 'materialize-css/dist/css/materialize.css'
        import 'materialize-css'
        const axios = require("axios");
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {

    /** 
     * Initial global constants
     */
    const selectElem = document.querySelectorAll('select');
    const baseURL = document.getElementById("baseurl");
    const url = document.getElementById("url");
    const autocompleteinstanceBaseUrl = M.Autocomplete.init(baseURL);
    const autocompleteinstanceUrl = M.Autocomplete.init(url);

//    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
//    });


    /**
     * Initialize method sets up the select dropdown
     */
    const initMethod = () => M.FormSelect.init(selectElem);

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
    const parseJson = (value) => catchJsonException(JSON.parse, value);

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


        renderNewInnerHTML(timerElement, createTimerText(finalRequestTime));
        addToAutocompleteInstance(autocompleteinstanceBaseUrl, baseURL);
        addToAutocompleteInstance(autocompleteinstanceUrl, url);
        if (success) {
            renderNewValue(responseElementH, stringifyJSON(response.headers));
            renderNewValue(responseElementB, stringifyJSON(response.data));
        } else {
            printErrorMessage(response);
        }
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

    /**
     * adds a new object to autocomplete element
     * @param {type} instance
     * @param {type} newElement
     */
    const addToAutocompleteInstance = (instance, newElement) =>
        instance.updateData({...instance.options.data, [newElement]: null});
    /**
     * prints error messages to DOM through M.toast method
     * @param {type} msg
     * @return {Function}
     */
    const printErrorMessage = (msg) =>
        M.toast({classes: "rounded card-panel red white-text text-darken-4 z-depth-5", html: `<p><code>${msg}</code></p>`});

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
        const data = parseJson(bodyElement.value);
        const headers = parseJson(headersElement.value);
        const axiosConfig = {method, url, baseURL, data, headers};

        console.log("REQUEST::", axiosConfig);
        const startTime = performance.now();

        axios(axiosConfig)
                .then((response) => renderDOM(response, getExecTime(startTime), true))
                .catch((error) => renderDOM(error, getExecTime(startTime), false));
    };
});