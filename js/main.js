import axios from 'axios';
import M from 'materialize-css';
import {Utils} from './utils.js';
import {Dom} from './dom.js';
import {AcUtils} from './autocomplete.js';
import {SAVE_SELECTOR} from './constants.js';

const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  
  let persistObject = {
    history: [],
    saved: [],
    acBaseUrl: [],
    acUrl: []
  };
  
  
  /** 
  * Initial global constants
  */
  const inputDOM = Dom.getInputElementsObj();
  const saveElement = document.getElementById(SAVE_SELECTOR);
  const autoCompleteObject = AcUtils.getAcObject();
  let outputDOM = Dom.getOutputElementsObj();
  
  /**
  * Initialize method sets up the select dropdown
  */
  const initMethod = () => {
    AcUtils.init(inputDOM, M);
    M.FormSelect.init(inputDOM.selectElements);
    
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    
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
    
    
    Dom.renderSidebarElement(persistObject, true)
    Dom.renderNewInnerHTML(outputDOM.timerElement, Utils.createTimerText(finalRequestTime));
    AcUtils.addToBaseUrl(baseURL);
    AcUtils.addToUrl(url);
    if (success) {
      console.log('RESPONSE SUCCESS::', response);
      Dom.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.headers));
      Dom.renderNewValue(outputDOM.responseElementB, Utils.stringifyJSON(response.data));
      Dom.renderStatusTag(outputDOM.statusElement, response.status);
    } else {
      if (response.response) {
        console.log('RESPONSE ERROR::', response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Dom.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.response.headers));
        Dom.renderNewValue(outputDOM.responseElementB, response.response.data);
        Dom.renderStatusTag(outputDOM.statusElement, response.response.status);
      } else if (response.request) {
        console.log('RESPONSE ERROR::', response);
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        Dom.renderNewValue(outputDOM.responseElementH, Utils.stringifyJSON(response.config.headers));
        Utils.printErrorMessage(M.toast, response);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('RESPONSE ERROR::', response);
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
    const axiosConfig = Dom.getInputValues();
    console.log('REQUEST::', axiosConfig);
    const startTime = performance.now();
    
    axios(axiosConfig)
    .then((response) => renderDOMValues(response, Utils.getExecTime(startTime), true))
    .catch((error) => renderDOMValues(error, Utils.getExecTime(startTime), false));
  };
  
  
  saveElement.onclick = () => {
    Dom.renderSidebarElement(persistObject, false);
  }
  
});