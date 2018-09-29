import axios from 'axios';
import { Utils } from './utils.js';
import { Dom } from './dom.js';
import { InitializeDom, InitializePersistObj } from './init.js';

const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  /** 
  * Initial global constants
  */
  let persistObject  = InitializePersistObj();
  const {requestElement, saveElement, clearHistoryElement} = Dom.getElementsWithEventHandlers();
  InitializeDom(document);
  
  /**
  * on click submit button 
  * 1. we prepare the axios config
  * 2. on response we call renderDOM to update view
  * @return {undefined}
  */
  requestElement.onclick = () => {
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
  
  [...document.querySelectorAll('#saved a.btn')].forEach(elem => elem.onclick = Dom.clearSaved(elem, persistObject));
  
});