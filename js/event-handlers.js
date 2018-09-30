import { Dom } from './dom.js';
import { Utils } from './utils.js';
const axios = require('axios');

/**
 * Event handlers initializer
 * sets up all onclick event handlers
 */
const EventHandlers = {
  initialize: (persistObject)=>{

    const {requestElement, saveElement, clearHistoryElement, savedElements} = Dom.getElementsWithEventHandlers();
    
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
      .then((response) => Dom.renderSuccessResponse(response, Utils.getExecTime(startTime), persistObject))
      .catch((error) => Dom.renderErrorResponse(error, Utils.getExecTime(startTime), persistObject));
    };
    
    saveElement.onclick = () => Dom.renderSidebarElementOnSave(persistObject);
    
    clearHistoryElement.onclick = () =>
    confirm("clear?")
    ?Dom.clearHistoryElements(persistObject)
    :{};
    
    savedElements.forEach(elem => elem.onclick = Dom.clearSaved(elem, persistObject));
  }
};

export { EventHandlers };