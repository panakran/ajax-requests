import axios from "axios";
import M from "materialize-css";
import {Utils} from "./utils.js";
import {DomUtils} from "./dom.js";
import {AcUtils} from "./autocomplete.js";
import {SAVE_SELECTOR} from "./constants.js";

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
    const saveElement = document.getElementById(SAVE_SELECTOR);
    const autoCompleteObject = AcUtils.getAcObject();
    let outputDOM = DomUtils.getOutputElementsObj();

    /**
     * Initialize method sets up the select dropdown
     */
    const initMethod = () => {
        AcUtils.init(inputDOM, M);
        M.FormSelect.init(inputDOM.selectElements);

        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
//        
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems);
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

        let historyElement = document.createElement("li");
        let methodElement = document.createElement("a");
        console.log("a", response);
        console.log("b",response.config);
        console.log("c",response.method);
        methodElement.innerHTML = response.config.method.toUpperCase() + " : " + response.request.responseURL;
        methodElement.classList.add("waves-effect");
        methodElement.classList.add("black-text");
        historyElement.appendChild(methodElement);
        const vals = DomUtils.readDOMValues(inputDOM);
        historyElement.valuesArray = vals;
        historyElement.onclick = renderInputValues;
        document.getElementById("history").appendChild(historyElement);

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

        persistObject.history = [...persistObject.history, axiosConfig];
        axios(axiosConfig)
                .then((response) => renderDOMValues(response, Utils.getExecTime(startTime), true))
                .catch((error) => renderDOMValues(error, Utils.getExecTime(startTime), false));
    };
    const renderInputValues = function () {
        console.log(this.valuesArray);
        const values = this.valuesArray;
        inputDOM.methodElement.value = values.method;
        M.FormSelect.init(inputDOM.methodElement);
        inputDOM.baseURLElement.focus();
        inputDOM.baseURLElement.value = values.baseURL;
        inputDOM.urlElement.focus();
        inputDOM.urlElement.value = values.url;
        inputDOM.headersElement.focus();
        inputDOM.headersElement.value = values.headers[0];
        inputDOM.bodyElement.focus();
        inputDOM.bodyElement.value = values.data[0];
    };

    saveElement.onclick = () => {
        /**
         * Getting DOM elements input values
         */
        const vals = DomUtils.readDOMValues(inputDOM);
        persistObject.saved = [...persistObject.saved, vals];
        let savedElement = document.createElement("li");
        let methodElement = document.createElement("a");
        methodElement.innerHTML = vals.method.toUpperCase() + " : " + vals.baseURL + vals.url;
        methodElement.classList.add("waves-effect");
        methodElement.classList.add("black-text");
        savedElement.appendChild(methodElement);
        savedElement.valuesArray = vals;
        savedElement.onclick = renderInputValues;
        document.getElementById("saved").appendChild(savedElement);

    };

});