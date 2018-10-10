import { Dom } from './dom.js';
import { DomUtils } from './domutils.js';
import { Utils } from './utils.js';
import { REQUEST_SELECTOR, SAVE_SELECTOR, CLEAR_HISTORY_SELECTOR } from "./constants";
const axios = require('axios');
const Nanobar = require('nanobar');


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

     var options = {
       target: document.getElementById('nano')
     };
     
     var nanobar = new Nanobar( options );
     
     //move bar
     nanobar.go( 10 ); // size bar 30%
     
     const axiosConfig = Dom.getInputValues();
     console.log('REQUEST::', axiosConfig);
     const startTime = performance.now();
     nanobar.go( 30 ); // size bar 30%
     axios(axiosConfig)
     .then((response) => {
       const execTime = Utils.getExecTime(startTime);
       Dom.renderSuccessResponse({response, execTime, axiosConfig})
       /**
        * Reset loading bar
        */
       nanobar.go( 80 ); // size bar 30%
       nanobar.go(100);
      setInterval(()=>{
        DomUtils.removeElementsBySelector(".nanobar")
      }, 1000);
    })
      .catch((response) => {
        const execTime = Utils.getExecTime(startTime);
        Dom.renderErrorResponse({response, execTime, axiosConfig})
      });
    };
    
    document.getElementById(SAVE_SELECTOR).onclick = () => Dom.renderSidebarElementOnSave();
    
    document.getElementById(CLEAR_HISTORY_SELECTOR).onclick = () =>
    confirm("Clear history?")
    ?Dom.clearHistoryElements(persistObject)
    :{};
    
    return persistObject;
  }
};

export { EventHandlers };