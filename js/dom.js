import { HISTORY_ELEMENTS_SELECTOR } from './constants';
import { Utils } from './utils';
import { DomUtils } from './domutils';
import { Persist } from './persist';
import { Helpers }from "./helpers";
import { Render } from './render'

const getDOMValues = ()=>{return {...Dom.getInputValues(), ...Dom.getOutputValues()};};

const Dom = {
  /**
  * returns input values 
  */
  getInputValues: () =>
  Utils.compose(Helpers.getMethod, Helpers.getBaseUrl, Helpers.getUrl, Helpers.getHeaders, Helpers.getData)({}),
  /**
  * returns output values 
  */
  getOutputValues: () => 
  Utils.compose(Helpers.getResponseH, Helpers.getResponseB, Helpers.getExecTime, Helpers.getStatus)({}),
  /**
  * Renders common and succes elements
  */
  renderSuccessResponse: (successObject)=>
  Utils.compose(Persist.addHistoryObject,Render.renderCommonElements,Render.renderSuccess)(successObject),
  /**
  * Renders common and error elements
  */
  renderErrorResponse: (errorObject)=>
  Utils.compose(Persist.addHistoryObject,Render.renderCommonElements,Render.renderError)(errorObject),
  /**
  * renders a side bar element history/saved
  */
  renderSidebarElementOnSave : () =>
  Utils.compose(Render.updateSavedDOM, Render.renderSideBarSavedElement, Persist.addSavedObject, Utils.addUniqueId)(getDOMValues()),
  
  renderSidebarElementOnRequest: (responseObject) => 
  Utils.compose(Render.updateHistoryDOM,Render.renderSideBarHistoryElement)(responseObject),
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
    Utils.compose(Render.updateHistoryDOM,Render.renderSideBarHistoryElement)(persistObject.history);
    Utils.compose(Render.updateSavedDOM,Render.renderSideBarSavedElement)(persistObject.saved);
    return persistObject;
  },
  /**
  * returns a delete and an icon element
  */
  createDeleteIconButton: (savedObject) =>
  Utils.compose(DomUtils.createIconElement, DomUtils.createDeleteButtonElement)({}, savedObject)
};
export  { Dom };
