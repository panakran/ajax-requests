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

    let persistObject = {
        history: [
//            {
//                method: "", url: "", baseURL: "", data: "", headers: ""
//            }
        ],
        saved: [
//            {
//                method: "", url: "", baseURL: "", data: "", headers: ""
//            }
        ],
        acBaseUrl: ["url1"],
        acUrl: ["url1"]
    };


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
//        
//        var elems = document.querySelectorAll('.sidenav');
//    var instances = M.Sidenav.init(elems);
//        
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
            console.log("RESPONSE SUCCESS::", response);
            DomUtils.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.headers));
            DomUtils.renderNewValue(outputDOM.responseElementB, Utils.stringifyJSON(response.data));
            DomUtils.renderStatusTag(outputDOM.statusElement, response.status);
        } else {
            if (response.response) {
                console.log("RESPONSE ERROR::", response);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                DomUtils.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.response.headers));
                DomUtils.renderNewValue(outputDOM.responseElementB, response.response.data);
                DomUtils.renderStatusTag(outputDOM.statusElement, response.response.status);
            } else if (response.request) {
                console.log("RESPONSE ERROR::", response);
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                DomUtils.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.config.headers));
                Utils.printErrorMessage(M.toast, response);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("RESPONSE ERROR::", response);
                Utils.printErrorMessage(M.toast, response.message);
            }
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
        
//        persistObject.history = [...persistObject.history, axiosConfig];
//        persistObject.history.forEach(x=> document.getElementById("slide-out").appendChild("<li><a href=\"\">dsad</a></li>"))
//        console.log("persistObject::", persistObject);
        axios(axiosConfig)
                .then((response) => renderDOMValues(response, Utils.getExecTime(startTime), true))
                .catch((error) => renderDOMValues(error, Utils.getExecTime(startTime), false));
    };
});