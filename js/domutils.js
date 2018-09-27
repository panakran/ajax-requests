import {
  ERROR_STATUS_CLASS,
  SUCCESS_STATUS_CLASS,
} from './constants';
import { Utils } from "./utils.js";

/**
* render new value to innerHTML
* @param {type} element
* @param {type} newValue
*/
const renderNewInnerHTML = (element, newValue) => {
  element.innerHTML = newValue;
};

/**
* render new status and apply classes
* @param {type} element
* @param {type} newValue
*/
const addClassAndRender = function(element, newValue, newClassesToApply) {
  element.classList.add(...newClassesToApply);
  renderNewInnerHTML(element, Utils.createStatusText(newValue));
};

const DomUtils = {
  /**
  * render new value to value
  * @param {type} element
  * @param {type} newValue
  */
  renderStatusTag: function(element, newValue) {
    element.classList = [];
    newValue < 400
    ? addClassAndRender(element, newValue, SUCCESS_STATUS_CLASS)
    : addClassAndRender(element, newValue, ERROR_STATUS_CLASS);
  },
  renderTimerTag: function(element, newValue){
    renderNewInnerHTML(element, Utils.createTimerText(newValue));
  },
  renderSideBarText : (methodElement, mainObject)=>{
    const color = mainObject.status<400?"green":"red";
    methodElement.innerHTML = `<span class="${color}-text">${mainObject.method}</span> - ${mainObject.baseURL}${mainObject.url}`;
    methodElement.classList.add('waves-effect');
    methodElement.classList.add('black-text');
  }
}
export { DomUtils };