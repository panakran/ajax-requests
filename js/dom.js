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
  EMPTY_PERSIST_OBJECT,
  SAVE_SELECTOR,
  CLEAR_HISTORY_SELECTOR
} from './constants';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { DomUtils } from './domutils.js';

let methodElement;
let baseURLElement;
let urlElement ;
let headersElement;
let bodyElement;
let requestElement;

let responseElementH;
let responseElementB;
let timerElement;
let statusElement;

/**
* renders one side bar object to side bar element based on isHistory input
* also adds it to persistObject
* values passed with mainObject
* @param {*} persistObject 
* @param {*} isHistory 
* @param {*} mainObject 
*/
const renderSideBarByInputs = (persistObject, isHistory, mainObject) => {
  isHistory
  ?persistObject.history = [...persistObject.history, mainObject]
  :persistObject.saved = [...persistObject.saved, mainObject];
  
  // const sideBarElement = Dom.createElement('li');
  const methodElement = Dom.createElement('a');
  
  if (isHistory){
    methodElement.classList.add("col");
    methodElement.classList.add("s12");
    DomUtils.renderSideBarText(methodElement, mainObject);
    let div = Dom.createElement('div');
    div.classList.add("row");
    div.appendChild(methodElement);
    document.getElementById('history').appendChild(div);
    
  }else{
    const uniqueId = Math.random(1000000);
    mainObject.id = uniqueId
    methodElement.classList.add("col");
    methodElement.classList.add("s11");
    let icon = Dom.createElement('i');
    icon.classList.add("material-icons", "black-text", "white", "right");
    icon.innerHTML = "clear";
    let close = Dom.createElement('a');
    close.setAttribute("href", "#");
    // close.setAttribute("onclick", "destroyElement(this)");
    close.setAttribute("id", uniqueId);
    close.classList.add("col", "s1", "btn", "black-text", "white", "z-depth-0");
    close.appendChild(icon);
    DomUtils.renderSideBarText(methodElement, mainObject);
    let div = Dom.createElement('div');
    div.classList.add("row");
    
    div.appendChild(methodElement);
    div.appendChild(close);
    document.getElementById('saved').appendChild(div);
  }
  
  methodElement.onclick = renderDOM(mainObject);
  
  // isHistory
  // ?
  // :
}


/**
*Bug fix for materilize we need to dispatch event when we set a select tag value through code 
* https://stackoverflow.com/questions/49833550/set-value-of-drop-down-select-with-materialize-css-1-0-0-without-jquery
* @param {*} element 
*/
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


/**
* function assigned on side bar elements
* we need to pass values of each side bar element when we trigger the onclick
* @param {*} mainObject 
*/
const renderDOM = (mainObject)=>{
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
  initialize:()=>{
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
  /**
  * returns the inputs elements
  */
  getInputElementsObj: () => {
    return { methodElement, baseURLElement, urlElement, headersElement, bodyElement, requestElement };
  },
  /**
  * returns the οθτputs elements
  */
  getOutputElementsObj: () => {
    return {responseElementH,responseElementB,timerElement,statusElement};
  },
  /**
  * returns input values 
  */
  getInputValues: function() {
    const inputDOM = this.getInputElementsObj();
    const method = inputDOM.methodElement.options[inputDOM.methodElement.selectedIndex].text;
    const baseURL = inputDOM.baseURLElement.value;
    const url = inputDOM.urlElement.value;
    const headers = Utils.parseJSON(inputDOM.headersElement.value);
    const data = Utils.parseJSON(inputDOM.bodyElement.value);
    return {method,url,baseURL,data,headers};
  },
  /**
  * returns output values 
  */
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
  /**
  * renders the results on output elements and adds a history onject to persist object
  */
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
        Utils.printErrorMessage(response);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('RESPONSE ERROR::', response);
        Utils.printErrorMessage(response.message);
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
  /**
  * clears all history elements
  */
  clearHistoryElements: (persistObject)=>{
    persistObject.history = [];
    [...document.querySelectorAll(HISTORY_ELEMENTS_SELECTOR)]
    .forEach(x=>x.parentNode.removeChild(x));
  },
  /**
  * renders the persist object when app starts
  */
  renderPersistObject: function(persistObject){
    persistObject.history.forEach(x=>renderSideBarByInputs(EMPTY_PERSIST_OBJECT, true, x));
    persistObject.saved.forEach(x=>renderSideBarByInputs(EMPTY_PERSIST_OBJECT, false, x));
  },
  getAutocompleteElements: () => {
    return { baseURLElement: document.getElementById(BASE_URL_SELECTOR), urlElement: document.getElementById(URL_SELECTOR) };
  },
  getElementsWithEventHandlers: () => {
    return {
      requestElement: document.getElementById(REQUEST_SELECTOR),
      saveElement: document.getElementById(SAVE_SELECTOR),
      clearHistoryElement: document.getElementById(CLEAR_HISTORY_SELECTOR)
    }
  },
  clearSaved: (elem, persistObj)=>{
    const helper = ()=>{
      console.log(elem, persistObj)
      if(confirm("Delete saved?")){
        persistObj.saved.splice(persistObj.saved.findIndex(item => item.id.toString() === elem.getAttribute("id")), 1)
        elem.parentElement.parentElement.removeChild(elem.parentElement);
      }
    }
    return helper;
  }
};

export { Dom };
