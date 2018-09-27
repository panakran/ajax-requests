import axios from 'axios';
import M from 'materialize-css';
import { Utils } from './utils.js';
import { AcUtils } from './autocomplete.js';
import { Dom } from './dom.js';
import { Persist } from './persist.js';
import { SAVE_SELECTOR, SELECT_TAG_SELECTOR, CLEAR_HISTORY_SELECTOR } from './constants.js';

const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  
  let data = Persist.loadFromLocalStorage();
  let persistObject;
  if (data === null){
    persistObject = {
      history: [],
      saved: [],
      acBaseUrl: [],
      acUrl: []
    };
  }else{
    persistObject = data;
  }

  Dom.renderPersistObject(persistObject);
  
  window.onbeforeunload = function(e) {
    console.log("save to local", persistObject);
    Persist.saveToLocalStorage(persistObject); 
  };
  
  /** 
  * Initial global constants
  */
  Dom.init();
  let inputDOM = Dom.getInputElementsObj();
  const saveElement = document.getElementById(SAVE_SELECTOR);
  const clearHistoryElement = document.getElementById(CLEAR_HISTORY_SELECTOR);
  /**
  * Initialize method sets up the select dropdown
  */
  const initMethod = () => {
    AcUtils.init(inputDOM, M);
    M.FormSelect.init(document.querySelectorAll(SELECT_TAG_SELECTOR));
    const collapsibleElems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibleElems);
    const sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);
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
    .then((response) => Dom.renderOutputValues(response, Utils.getExecTime(startTime), persistObject, true))
    .catch((error) => Dom.renderOutputValues(error, Utils.getExecTime(startTime), persistObject, false));
  };
  
  
  saveElement.onclick = () => Dom.renderSidebarElement(persistObject, false);
  
  clearHistoryElement.onclick = () =>
  confirm("clear?")
  ?Dom.clearHistoryElements(persistObject)
  :{};
  
  
  
  
});