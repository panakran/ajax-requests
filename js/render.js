import {
  BASE_URL_SELECTOR,
  URL_SELECTOR,
  RESPONSE_HEADER_SELECTOR,
  RESPONSE_BODY_SELECTOR,
  HEADERS_SELECTOR,
  BODY_SELECTOR,
  METHODS_SELECTOR,
  HISTORY_SELECTOR,
  SAVED_SELECTOR,
} from './constants';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { Dom }from './dom.js';
import { DomUtils } from './domutils.js';
import { Helpers } from './helpers';

const Render = {
  /**
  * renders one history bar object to side bar element based
  * also adds it to persistObject
  * values passed with mainObject
  * @param {*} persistObject 
  * @param {*} mainObject 
  */
  renderSideBarHistoryElement : (responseObject)=>{
    
    let divs = Utils.createObjectArray(responseObject).map(mainObject=>{
      const methodElement = DomUtils.createElement('a');
      DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s12", "truncate"])
      methodElement.onclick = Render.renderDOM(mainObject);
      let div = DomUtils.createElement('div');
      DomUtils.addClasses(div, ["row"]); 
      div.appendChild(methodElement);
      return div;
    });
    console.log(divs)
    return divs;
  },
  /**
  * renders one saved bar object to side bar element based
  * also adds it to persistObject
  * values passed with mainObject
  * @param {*} persistObject 
  * @param {*} mainObject 
  */
  renderSideBarSavedElement : (responseObject)=>{
    let divs = Utils.createObjectArray(responseObject).map(mainObject=>{
      const methodElement = DomUtils.createElement('a');
      DomUtils.renderMethodElement(methodElement, mainObject, ["col", "s11", "truncate"]);
      let {deleteButton, icon} = Dom.createDeleteIconButton(mainObject);
      deleteButton.appendChild(icon);
      let div = DomUtils.createElement('div');
      DomUtils.addClasses(div, ["row"]);   
      div.appendChild(methodElement);
      div.appendChild(deleteButton);
      methodElement.onclick = Render.renderDOM(mainObject);
      return div;
    });
    return divs;
  },
  /**
  * Renders only elements on success request
  * @param {*} response 
  */
  renderSuccess:  (successObject) => {
    console.log('RESPONSE SUCCESS::', successObject.response);
    document.getElementById(RESPONSE_HEADER_SELECTOR).value = Utils.stringifyJSON(successObject.response.headers);
    document.getElementById(RESPONSE_BODY_SELECTOR).value = Utils.stringifyJSON(successObject.response.data);
    DomUtils.renderStatusTag(successObject.response.status);
    return Helpers.createSuccessObject(successObject);
  },
  
  /**
  * Renders only elements on error request
  * @param {*} response 
  */
  renderError : (errorObject) => {
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
    console.log("1", Helpers.createErrorObject(errorObject));
    return Helpers.createErrorObject(errorObject);
  },
  /**
  * function assigned on side bar elements
  * we need to pass values of each side bar element when we trigger the onclick
  * @param {*} mainObject 
  */
  renderDOM : (mainObject)=>{
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
  },
  
  /**
  * Renders only elements that are common on success/error
  * @param {*} outputDOM 
  * @param {*} finalRequestTime 
  * @param {*} persistObject 
  */
  renderCommonElements : (responseObject) => {
    const baseURL = document.getElementById(BASE_URL_SELECTOR).value;
    const url = document.getElementById(URL_SELECTOR).value;
    AcUtils.addToBaseUrl(baseURL);
    AcUtils.addToUrl(url);
    DomUtils.renderTimerTag(responseObject.execTime);
    Dom.renderSidebarElementOnRequest(responseObject);
    return responseObject;
  },
  
  updateHistoryDOM : (divs)=> divs.forEach(div=>document.getElementById(HISTORY_SELECTOR).appendChild(div)),
  
  updateSavedDOM : (divs)=> divs.forEach(div=>document.getElementById(SAVED_SELECTOR).appendChild(div))
}

export { Render };