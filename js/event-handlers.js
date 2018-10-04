import { Dom } from './dom.js';
import { Utils } from './utils.js';
const axios = require('axios');

import {
  REQUEST_SELECTOR,
  SAVE_SELECTOR,
  CLEAR_HISTORY_SELECTOR,
} from "./constants";


/**
* Event handlers initializer
* sets up all onclick event handlers
*/
const EventHandlers = {
  initialize: (persistObject)=>{
    /**
    * on click submit button 
    * 1. we prepare the axios config
    * 2. on response we call renderDOM to update view
    * @return {undefined}
    */
    document.getElementById(REQUEST_SELECTOR).onclick = () => {
      /**
      * Getting DOM elements input values
      */
      const axiosConfig = Dom.getInputValues();
      console.log('REQUEST::', axiosConfig);
      const startTime = performance.now();
      axios(axiosConfig)
      .then((response) => {
        const execTime = Utils.getExecTime(startTime);
        Dom.renderSuccessResponse({response, execTime, axiosConfig})
      })
      .catch((response) => {
        const execTime = Utils.getExecTime(startTime);
        Dom.renderErrorResponse({response, execTime, axiosConfig})
      });
    };
    
    document.getElementById(SAVE_SELECTOR).onclick = () => Dom.renderSidebarElementOnSave();
    
    document.getElementById(CLEAR_HISTORY_SELECTOR).onclick = () =>
    confirm("clear?")
    ?Dom.clearHistoryElements(persistObject)
    :{};
    
    return persistObject;
  }
};

export { EventHandlers };