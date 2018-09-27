import {
  BASE_URL_SELECTOR,
  URL_SELECTOR,
  RESPONSE_HEADER_SELECTOR,
  RESPONSE_BODY_SELECTOR,
  EXEC_TIME_SELECTOR,
  HEADERS_SELECTOR,
  BODY_SELECTOR,
  METHODS_SELECTOR,
  REQUEST_SELECTOR,
  STATUS_SELECTOR,
  HISTORY_ELEMENTS_SELECTOR,
} from './constants';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { DomUtils } from './domutils.js';
import M from 'materialize-css';

let methodElement = document.getElementById(METHODS_SELECTOR);
let baseURLElement = document.getElementById(BASE_URL_SELECTOR);
let urlElement = document.getElementById(URL_SELECTOR);
let headersElement = document.getElementById(HEADERS_SELECTOR);
let bodyElement = document.getElementById(BODY_SELECTOR);
let requestElement = document.getElementById(REQUEST_SELECTOR);

let responseElementH =  document.getElementById(RESPONSE_HEADER_SELECTOR);
let responseElementB =  document.getElementById(RESPONSE_BODY_SELECTOR);
let timerElement =  document.getElementById(EXEC_TIME_SELECTOR);
let statusElement =  document.getElementById(STATUS_SELECTOR);

const renderSideBarByInputs = (persistObject, isHistory, mainObject) => {
  isHistory
  ?persistObject.history = [...persistObject.history, mainObject]
  :persistObject.saved = [...persistObject.saved, mainObject];
  
  const sideBarElement = Dom.createElement('li');
  const methodElement = Dom.createElement('a');
  DomUtils.renderSideBarText(methodElement, mainObject);
  sideBarElement.appendChild(methodElement);
  sideBarElement.onclick = renderInputValues(mainObject);
  
  isHistory
  ?document.getElementById('history').appendChild(sideBarElement)
  :document.getElementById('saved').appendChild(sideBarElement);
}


// https://stackoverflow.com/questions/49833550/set-value-of-drop-down-select-with-materialize-css-1-0-0-without-jquery
const dispatchSelectEvent = (element) =>{
  let event;
  if (typeof(Event) === 'function') {
    event = new Event('change');
  } else {  // for IE11
    event = document.createEvent('Event');
    event.initEvent('change', true, true);
  }
  element.dispatchEvent(event);
} 


const renderInputValues = (mainObject)=>{
  const helperFunc=() =>{
    const values = mainObject;
    const inputDOM = Dom.getInputElementsObj();
    const outputDOM = Dom.getOutputElementsObj();
    
    /**
    * Render input elements on click
    */
    inputDOM.methodElement.value = values.method;
    dispatchSelectEvent(inputDOM.methodElement);
    inputDOM.baseURLElement.focus();
    inputDOM.baseURLElement.value = values.baseURL;
    inputDOM.urlElement.focus();
    inputDOM.urlElement.value = values.url;
    inputDOM.headersElement.focus();
    inputDOM.headersElement.value =  Utils.stringifyJSON(values.headers);
    inputDOM.bodyElement.focus();
    inputDOM.bodyElement.value =  Utils.stringifyJSON(values.data);
    
    /**
    * Render output elements on click
    */
    outputDOM.responseElementH.value = Utils.stringifyJSON(values.responseH);
    outputDOM.responseElementB.value = Utils.stringifyJSON(values.responseB);
    DomUtils.renderTimerTag(outputDOM.timerElement, values.execTime);
    DomUtils.renderStatusTag(outputDOM.statusElement, values.status)
  };
  return helperFunc;
};

const Dom = {
  init:()=>{
    /**
    * Initialize input elements
    */
    methodElement = document.getElementById(METHODS_SELECTOR);
    baseURLElement = document.getElementById(BASE_URL_SELECTOR);
    urlElement = document.getElementById(URL_SELECTOR);
    headersElement = document.getElementById(HEADERS_SELECTOR);
    bodyElement = document.getElementById(BODY_SELECTOR);
    requestElement = document.getElementById(REQUEST_SELECTOR);
    
    /**
    * Initialize output elements
    */
    responseElementH =  document.getElementById(RESPONSE_HEADER_SELECTOR);
    responseElementB =  document.getElementById(RESPONSE_BODY_SELECTOR);
    timerElement =  document.getElementById(EXEC_TIME_SELECTOR);
    statusElement =  document.getElementById(STATUS_SELECTOR);
  },
  getInputElementsObj: () => {
    return { methodElement, baseURLElement, urlElement, headersElement, bodyElement, requestElement };
  },
  getOutputElementsObj: () => {
    return {responseElementH,responseElementB,timerElement,statusElement};
  },
  
  getInputValues: function() {
    const inputDOM = this.getInputElementsObj();
    const method = inputDOM.methodElement.options[inputDOM.methodElement.selectedIndex].text;
    const baseURL = inputDOM.baseURLElement.value;
    const url = inputDOM.urlElement.value;
    const headers = Utils.parseJSON(inputDOM.headersElement.value);
    const data = Utils.parseJSON(inputDOM.bodyElement.value);
    return {method,url,baseURL,data,headers};
  },
  getOutputValues: function() {
    const outputDOM = this.getOutputElementsObj();
    const responseH = Utils.parseJSON(outputDOM.responseElementH.value);
    const responseB = Utils.parseJSON(outputDOM.responseElementB.value);
    const execTime = Utils.extractFloat(outputDOM.timerElement.innerHTML);
    const status = Utils.extractStatusCode(outputDOM.statusElement.innerHTML);
    return {responseH,responseB,execTime,status};
  },
  createElement: function(tag){
    return document.createElement(tag);
  },
  renderOutputValues: function(response, finalRequestTime, persistObject, success){
    let outputDOM = this.getOutputElementsObj();
    
    const baseURL = baseURLElement.value;
    const url = urlElement.value;
    AcUtils.addToBaseUrl(baseURL);
    AcUtils.addToUrl(url);
    if (success) {
      console.log('RESPONSE SUCCESS::', response);
      outputDOM.responseElementH.value = Utils.stringifyJSON(response.headers);
      outputDOM.responseElementB.value = Utils.stringifyJSON(response.data);
      DomUtils.renderStatusTag(outputDOM.statusElement, response.status);
    } else {
      if (response.response) {
        console.log('RESPONSE ERROR::', response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        outputDOM.responseElementH.value = Utils.stringifyJSON(response.response.headers);
        outputDOM.responseElementB.value = response.response.data;
        DomUtils.renderStatusTag(outputDOM.statusElement, response.response.status);
      } else if (response.request) {
        console.log('RESPONSE ERROR::', response);
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        outputDOM.responseElementH.value = Utils.stringifyJSON(response.config.headers);
        Utils.printErrorMessage(M.toast, response);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('RESPONSE ERROR::', response);
        Utils.printErrorMessage(M.toast, response.message);
      }
    }
    DomUtils.renderTimerTag(outputDOM.timerElement, finalRequestTime);
    this.renderSidebarElement(persistObject, true)
  },
  renderSidebarElement : function(persistObject, isHistory){
    const inputs = Dom.getInputValues();
    const outputs = Dom.getOutputValues();
    const mainObject = {...inputs, ...outputs};
    renderSideBarByInputs(persistObject, isHistory, mainObject);
    
  },
  clearHistoryElements: (persistObject)=>{
    persistObject.history = [];
    [...document.querySelectorAll(HISTORY_ELEMENTS_SELECTOR)]
    .forEach(x=>x.parentNode.removeChild(x));
  },
  renderPersistObject: function(persistObject){
    let clearPersistObject = { history: [],saved: [],acBaseUrl: [],acUrl: [] };
    persistObject.history.forEach(x=>renderSideBarByInputs(clearPersistObject, true, x));
    persistObject.saved.forEach(x=>renderSideBarByInputs(clearPersistObject, false, x));
  }
};

export { Dom };
