import {
  BASE_URL_SELECTOR,
  URL_SELECTOR,
  RESPONSE_HEADER_SELECTOR,
  RESPONSE_BODY_SELECTOR,
  EXEC_TIME_SELECTOR,
  HEADERS_SELECTOR,
  BODY_SELECTOR,
  METHODS_SELECTOR,
  STATUS_SELECTOR,
  HISTORY_SELECTOR,
  HISTORY_ELEMENTS_SELECTOR,
  SAVED_SELECTOR,
} from './constants';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { DomUtils } from './domutils.js';
import { Persist } from './persist';
const R = require("ramda");

/**
* renders one history bar object to side bar element based
* also adds it to persistObject
* values passed with mainObject
* @param {*} persistObject 
* @param {*} mainObject 
*/
const renderSideBarHistoryElement = (responseObject)=>{
  
  let divs = Utils.createObjectArray(responseObject).map(mainObject=>{
    const methodElement = DomUtils.createElement('a');
    DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s12", "truncate"])
    methodElement.onclick = renderDOM(mainObject);
    let div = DomUtils.createElement('div');
    DomUtils.addClasses(div, ["row"]); 
    div.appendChild(methodElement);
    return div;
  });
  console.log(divs)
  return divs;
}

const getMethod = (obj)=> {
  const method = document.getElementById(METHODS_SELECTOR).options[document.getElementById(METHODS_SELECTOR).selectedIndex].text;
  return {...obj, method};
}

const getBaseUrl = (obj)=> {
  const baseURL = document.getElementById(BASE_URL_SELECTOR).value;
  return {...obj, baseURL};
}

const getUrl = (obj)=> {
  const url = document.getElementById(URL_SELECTOR).value;
  return {...obj, url};
}

const getHeaders = (obj)=> {
  const headers = Utils.parseJSON(document.getElementById(HEADERS_SELECTOR).value);
  return {...obj, headers};
}

const getData = (obj)=> {
  const data = Utils.parseJSON(document.getElementById(BODY_SELECTOR).value);
  return {...obj, data};
}

const getResponseH = (obj)=> {
  const responseH = Utils.parseJSON(document.getElementById(RESPONSE_HEADER_SELECTOR).value);
  return {...obj, responseH};
}
const getResponseB = (obj)=> {
  const responseB = Utils.parseJSON(document.getElementById(RESPONSE_BODY_SELECTOR).value);
  return {...obj, responseB};
}
const getExecTime = (obj)=> {
  const execTime =  Utils.extractFloat(document.getElementById(EXEC_TIME_SELECTOR).innerHTML);
  return {...obj, execTime};
}
const getStatus = (obj)=> {
  const status = Utils.extractStatusCode(document.getElementById(STATUS_SELECTOR).innerHTML);
  return {...obj, status};
}



const getDOMValues = ()=>{return {...Dom.getInputValues(), ...Dom.getOutputValues()};}
const updateHistoryDOM = (divs)=> divs.forEach(div=>document.getElementById(HISTORY_SELECTOR).appendChild(div));
const updateSavedDOM = (divs)=> divs.forEach(div=>document.getElementById(SAVED_SELECTOR).appendChild(div));

/**
* Renders only elements that are common on success/error
* @param {*} outputDOM 
* @param {*} finalRequestTime 
* @param {*} persistObject 
*/
const renderCommonElements = (responseObject) => {
  const baseURL = document.getElementById(BASE_URL_SELECTOR).value;
  const url = document.getElementById(URL_SELECTOR).value;
  AcUtils.addToBaseUrl(baseURL);
  AcUtils.addToUrl(url);
  DomUtils.renderTimerTag(responseObject.execTime);
  Dom.renderSidebarElementOnRequest(responseObject);
  return responseObject;
};

const createSuccessObject = (successObject)=>{
  return {
    headers: successObject.axiosConfig.headers[0],
    data: successObject.axiosConfig.data[0],
    baseURL: successObject.axiosConfig.baseURL,
    url: successObject.axiosConfig.url,
    method: successObject.axiosConfig.method,
    responseH: successObject.response.headers,
    responseB: successObject.response.data,
    status: successObject.response.status,
    execTime: successObject.execTime
  };
}
const createErrorObject = (errorObject)=>{
  return {
    headers: errorObject.axiosConfig.headers[0],
    data: errorObject.axiosConfig.data[0],
    baseURL: errorObject.axiosConfig.baseURL,
    url: errorObject.axiosConfig.url,
    method: errorObject.axiosConfig.method,
    responseH: errorObject.response.response.headers,
    responseB: errorObject.response.response.data,
    status: errorObject.response.response.status,
    execTime: errorObject.execTime
  };
}

/**
* Renders only elements on success request
* @param {*} response 
*/
const renderSuccess =  (successObject) => {
  console.log('RESPONSE SUCCESS::', successObject.response);
  document.getElementById(RESPONSE_HEADER_SELECTOR).value = Utils.stringifyJSON(successObject.response.headers);
  document.getElementById(RESPONSE_BODY_SELECTOR).value = Utils.stringifyJSON(successObject.response.data);
  DomUtils.renderStatusTag(successObject.response.status);
  return createSuccessObject(successObject);
};

/**
* Renders only elements on error request
* @param {*} response 
*/
const renderError = (errorObject) => {
  if (errorObject.response.response) {
    console.log('RESPONSE ERROR::', errorObject.response.response);
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    document.getElementById(RESPONSE_HEADER_SELECTOR).value = Utils.stringifyJSON(errorObject.response.response.headers);
    document.getElementById(RESPONSE_BODY_SELECTOR).value = errorObject.response.response.data;
    DomUtils.renderStatusTag(errorObject.response.response.status);
  } else if (errorObject.response.request) {
    console.log('RESPONSE ERROR::', errorObject.response);
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    document.getElementById(RESPONSE_HEADER_SELECTOR).value = Utils.stringifyJSON(errorObject.response.config.headers);
    Utils.printErrorMessage(errorObject.response);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('RESPONSE ERROR::', errorObject.response);
    Utils.printErrorMessage(errorObject.response.message);
  }
  console.log("1", createErrorObject(errorObject));
  return createErrorObject(errorObject);
}

/**
* renders one saved bar object to side bar element based
* also adds it to persistObject
* values passed with mainObject
* @param {*} persistObject 
* @param {*} mainObject 
*/
const renderSideBarSavedElement = (responseObject)=>{
  let divs = Utils.createObjectArray(responseObject).map(mainObject=>{
    const methodElement = DomUtils.createElement('a');
    DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s11", "truncate"]);
    let {deleteButton, icon} = Dom.createDeleteIconButton(mainObject);
    deleteButton.appendChild(icon);
    let div = DomUtils.createElement('div');
    DomUtils.addClasses(div, ["row"]);   
    div.appendChild(methodElement);
    div.appendChild(deleteButton);
    methodElement.onclick = renderDOM(mainObject);
    return div;
  });
  return divs;
}

/**
* function assigned on side bar elements
* we need to pass values of each side bar element when we trigger the onclick
* @param {*} mainObject 
*/
const renderDOM = (mainObject)=>{
  return () =>{
    const values = mainObject;
    /**
    * Render input elements on click
    */
    document.getElementById(METHODS_SELECTOR).value = values.method;
    DomUtils.dispatchSelectEvent(document.getElementById(METHODS_SELECTOR));
    document.getElementById(BASE_URL_SELECTOR).focus();
    document.getElementById(BASE_URL_SELECTOR).value = values.baseURL;
    document.getElementById(URL_SELECTOR).focus();
    document.getElementById(URL_SELECTOR).value = values.url;
    document.getElementById(HEADERS_SELECTOR).focus();
    document.getElementById(HEADERS_SELECTOR).value =  Utils.stringifyJSON(values.headers);
    document.getElementById(BODY_SELECTOR).focus();
    document.getElementById(BODY_SELECTOR).value =  Utils.stringifyJSON(values.data);
    
    /**
    * Render output elements on click
    */
    document.getElementById(RESPONSE_HEADER_SELECTOR).value = Utils.stringifyJSON(values.responseH);
    document.getElementById(RESPONSE_BODY_SELECTOR).value = Utils.stringifyJSON(values.responseB);
    DomUtils.renderTimerTag(values.execTime);
    DomUtils.renderStatusTag(values.status)
  };
};

const Dom = {
  /**
  * returns input values 
  */
  getInputValues: () =>
  R.compose(getMethod, getBaseUrl, getUrl, getHeaders, getData)({}),
  /**
  * returns output values 
  */
  getOutputValues: () => 
  R.compose(getResponseH, getResponseB, getExecTime, getStatus)({}),
  /**
  * Renders common and succes elements
  */
  renderSuccessResponse: (successObject)=>
  R.compose(Persist.addHistoryObject,renderCommonElements,renderSuccess)(successObject),
  /**
  * Renders common and error elements
  */
  renderErrorResponse: (errorObject)=>
  R.compose(Persist.addHistoryObject,renderCommonElements,renderError)(errorObject),
  /**
  * renders a side bar element history/saved
  */
  renderSidebarElementOnSave : () =>
  R.compose(updateSavedDOM, renderSideBarSavedElement,Persist.addSavedObject, Utils.addUniqueId)(getDOMValues()),
  
  renderSidebarElementOnRequest: (responseObject) => 
    R.compose(updateHistoryDOM,renderSideBarHistoryElement)(responseObject),
  /**
  * onclick event handler clears all history elements when pressing delete
  */
  clearHistoryElements: ()=>{
    Persist.clearHistory();
    DomUtils.removeElementsBySelector(HISTORY_ELEMENTS_SELECTOR);
  },
  /**
  * renders the persist object when app starts
  */
  renderPersistObject: (persistObject) => {
    R.compose(updateHistoryDOM,renderSideBarHistoryElement)(persistObject.history);
    R.compose(updateSavedDOM,renderSideBarSavedElement)(persistObject.saved);
    return persistObject;
  },
  /**
  * returns a delete and an icon element
  */
  createDeleteIconButton: (savedObject) =>
  R.compose(DomUtils.createIconElement, DomUtils.createDeleteButtonElement)({}, savedObject)
};

export { Dom };
