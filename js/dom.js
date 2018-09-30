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
  HISTORY_SELECTOR,
  HISTORY_ELEMENTS_SELECTOR,
  EMPTY_PERSIST_OBJECT,
  SAVE_SELECTOR,
  SAVED_SELECTOR,
  SAVED_DELETE_ELEMENTS_SELECTOR,
  REMOVE_SAVED_ICON_CLASSES,
  REMOVE_SAVED_BUTTON_CLASSES,
  CLEAR_HISTORY_SELECTOR
} from './constants';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { DomUtils } from './domutils.js';

/**
* Init input elements
*/
let methodElement;
let baseURLElement;
let urlElement ;
let headersElement;
let bodyElement;
/**
* returns the inputs elements
*/
const getInputElementsObj = () => {
  return { methodElement, baseURLElement, urlElement, headersElement, bodyElement, requestElement };
}

/**
* Init output elements
*/
let responseElementH;
let responseElementB;
let timerElement;
let statusElement;
/**
* returns the output elements
*/
const getOutputElementsObj = () => {
  return {responseElementH,responseElementB,timerElement,statusElement};
}

/**
* Init onclick events elements
*/
let requestElement;
let saveElement;
let clearHistoryElement;
let savedElements = [];

/**
 * Renders only elements that are common on success/error
 * @param {*} outputDOM 
 * @param {*} finalRequestTime 
 * @param {*} persistObject 
 */
const renderCommonElements = (outputDOM, finalRequestTime, persistObject) => {
  const baseURL = baseURLElement.value;
  const url = urlElement.value;
  AcUtils.addToBaseUrl(baseURL);
  AcUtils.addToUrl(url);
  DomUtils.renderTimerTag(outputDOM.timerElement, finalRequestTime);
  Dom.renderSidebarElementOnRequest(persistObject);
};

/**
 * Renders only elements on success request
 * @param {*} response 
 */
const renderSuccess =  (response) => {
  let outputDOM = getOutputElementsObj();
  console.log('RESPONSE SUCCESS::', response);
  outputDOM.responseElementH.value = Utils.stringifyJSON(response.headers);
  outputDOM.responseElementB.value = Utils.stringifyJSON(response.data);
  DomUtils.renderStatusTag(outputDOM.statusElement, response.status);
  return outputDOM;
};

/**
 * Renders only elements on error request
 * @param {*} response 
 */
const renderError = (response) => {
  let outputDOM = getOutputElementsObj();
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
  return outputDOM;
}



/**
* renders one history bar object to side bar element based
* also adds it to persistObject
* values passed with mainObject
* @param {*} persistObject 
* @param {*} mainObject 
*/
const renderSideBarHistoryElement = (persistObject, mainObject)=>{
  persistObject.history = [...persistObject.history, mainObject];
  
  const methodElement = Dom.createElement('a');
  DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s12", "truncate"])
  let div = Dom.createElement('div');
  DomUtils.addClasses(div, ["row"]); 
  div.appendChild(methodElement);
  document.getElementById(HISTORY_SELECTOR).appendChild(div);
  methodElement.onclick = renderDOM(mainObject);
  
}
/**
* renders one saved bar object to side bar element based
* also adds it to persistObject
* values passed with mainObject
* @param {*} persistObject 
* @param {*} mainObject 
*/
const renderSideBarSavedElement = (persistObject, mainObject)=>{
  persistObject.saved = [...persistObject.saved, mainObject];
  const methodElement = Dom.createElement('a');
  DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s11", "truncate"]);
  
  const uid = Utils.generateUID();
  mainObject.id = uid
  let {deleteButton, icon} = Dom.createDeleteIconButton(persistObject, uid);
  deleteButton.appendChild(icon);
  let div = Dom.createElement('div');
  DomUtils.addClasses(div, ["row"]);   
  div.appendChild(methodElement);
  div.appendChild(deleteButton);
  document.getElementById(SAVED_SELECTOR).appendChild(div);
  methodElement.onclick = renderDOM(mainObject);
}

/**
* function assigned on side bar elements
* we need to pass values of each side bar element when we trigger the onclick
* @param {*} mainObject 
*/
const renderDOM = (mainObject)=>{
  const helperFunc=() =>{
    const values = mainObject;
    const inputDOM = getInputElementsObj();
    const outputDOM = getOutputElementsObj();
    
    /**
    * Render input elements on click
    */
    inputDOM.methodElement.value = values.method;
    DomUtils.dispatchSelectEvent(inputDOM.methodElement);
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

/**
 * creates a values object from input and output values
 */
const createMainObj = () =>{
  const inputs = Dom.getInputValues();
  const outputs = Dom.getOutputValues();
  return {...inputs, ...outputs};
}

const Dom = {
  initialize:()=>{
    
    /**
    * Elements with event handlers
    */
    saveElement = document.getElementById(SAVE_SELECTOR);
    clearHistoryElement = document.getElementById(CLEAR_HISTORY_SELECTOR);
    requestElement = document.getElementById(REQUEST_SELECTOR);
    savedElements = [...document.querySelectorAll(SAVED_DELETE_ELEMENTS_SELECTOR)];
    
    /**
    * Initialize input elements
    */
    methodElement = document.getElementById(METHODS_SELECTOR);
    baseURLElement = document.getElementById(BASE_URL_SELECTOR);
    urlElement = document.getElementById(URL_SELECTOR);
    headersElement = document.getElementById(HEADERS_SELECTOR);
    bodyElement = document.getElementById(BODY_SELECTOR);
    
    /**
    * Initialize output elements
    */
    responseElementH =  document.getElementById(RESPONSE_HEADER_SELECTOR);
    responseElementB =  document.getElementById(RESPONSE_BODY_SELECTOR);
    timerElement =  document.getElementById(EXEC_TIME_SELECTOR);
    statusElement =  document.getElementById(STATUS_SELECTOR);
  },
  /**
  * returns input values 
  */
  getInputValues: function() {
    const inputDOM = getInputElementsObj();
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
    const outputDOM = getOutputElementsObj();
    const responseH = Utils.parseJSON(outputDOM.responseElementH.value);
    const responseB = Utils.parseJSON(outputDOM.responseElementB.value);
    const execTime = Utils.extractFloat(outputDOM.timerElement.innerHTML);
    const status = Utils.extractStatusCode(outputDOM.statusElement.innerHTML);
    return {responseH,responseB,execTime,status};
  },
  /**
  * create element shorthand
  */
  createElement: function(tag){
    return document.createElement(tag);
  },
  /**
   * Renders common and succes elements
   */
  renderSuccessResponse: function(response, finalRequestTime, persistObject){
    renderCommonElements(renderSuccess(response), finalRequestTime, persistObject);
  },
  /**
   * Renders common and error elements
   */
  renderErrorResponse: function(response, finalRequestTime, persistObject){
    renderCommonElements(renderError(response), finalRequestTime, persistObject);
  },
  /**
  * renders a side bar element history/saved
  */
  renderSidebarElementOnSave : (persistObject) => {
    const mainObject = createMainObj();
    renderSideBarSavedElement(persistObject, mainObject);
  },
  renderSidebarElementOnRequest: (persistObject) => {
    const mainObject = createMainObj();
    renderSideBarHistoryElement(persistObject, mainObject);
  },
  /**
  * onclick event handler clears all history elements when pressing delete
  */
  clearHistoryElements: (persistObject)=>{
    persistObject.history = [];
    [...document.querySelectorAll(HISTORY_ELEMENTS_SELECTOR)]
    .forEach(x=>x.parentNode.removeChild(x));
  },
  /**
  * renders the persist object when app starts
  */
  renderPersistObject: (persistObject) => {
    persistObject.history.forEach(historyObject=>renderSideBarHistoryElement(EMPTY_PERSIST_OBJECT, historyObject));
    persistObject.saved.forEach(savedObject=>renderSideBarSavedElement(EMPTY_PERSIST_OBJECT, savedObject));
  },
  getElementsWithEventHandlers: () => {
    return { requestElement, saveElement, clearHistoryElement, savedElements }
  },
  /**
  * onclick handler method for saved elements on pressing delete
  */
  clearSaved: (elem, persistObj)=>{
    const helper = ()=>{
      const id = elem.getAttribute("id");
      if(confirm("Delete saved?")){
        persistObj.saved.splice(Utils.findIdIndex(persistObj.saved, id), 1)
        DomUtils.removeParentElement(elem);
      }
    }
    return helper;
  },
  /**
   * returns a delete and an icon element
   */
  createDeleteIconButton: function(persistObject, uid) {
    let icon = Dom.createElement('i');
    DomUtils.addClasses(icon, REMOVE_SAVED_ICON_CLASSES);
    icon.innerHTML = "clear";
    let deleteButton = Dom.createElement('a');
    deleteButton.setAttribute("href", "#");
    deleteButton.onclick = this.clearSaved(deleteButton, persistObject);
    deleteButton.setAttribute("id", uid);
    DomUtils.addClasses(deleteButton,REMOVE_SAVED_BUTTON_CLASSES);
    return { deleteButton, icon }
  }
};

export { Dom };
