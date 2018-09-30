import { ERROR_STATUS_CLASS, SUCCESS_STATUS_CLASS } from './constants';
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

/**
 * Renders a side bar element and sets color to green/red based on success/error response
 * @param {*} methodElement 
 * @param {*} mainObject 
 */
const renderSideBarText = (methodElement, mainObject)=>{
  const color = mainObject.status<400?"green":"red";
  methodElement.innerHTML = `<span class="${color}-text">${mainObject.method}</span> - ${mainObject.baseURL}${mainObject.url}`;
  methodElement.classList.add('waves-effect');
  methodElement.classList.add('black-text');
}

const DomUtils = {
  /**
  * render new value to status element
  * @param {type} element
  * @param {type} newValue
  */
  renderStatusTag: function(element, newValue) {
    element.classList = [];
    newValue < 400
    ? addClassAndRender(element, newValue, SUCCESS_STATUS_CLASS)
    : addClassAndRender(element, newValue, ERROR_STATUS_CLASS);
  },

  /**
   * render new value to timer element
   */
  renderTimerTag: function(element, newValue){
    renderNewInnerHTML(element, Utils.createTimerText(newValue));
  },
  /**
   * removes parent and himself of an element 
   */
  removeParentElement: (element) => element.parentElement.parentElement.removeChild(element.parentElement),
  /**
   * add class shorthand
   */
  addClasses: (element, classArray) => element.classList.add(...classArray),
  /**
  *Bug fix for materilize we need to dispatch event when we set a select tag value through code 
  * https://stackoverflow.com/questions/49833550/set-value-of-drop-down-select-with-materialize-css-1-0-0-without-jquery
  * @param {*} element 
  */
  dispatchSelectEvent: (element) =>{
    let event;
    if (typeof(Event) === 'function') {
      event = new Event('change');
    }
    element.dispatchEvent(event);
  },
  /**
   * renders a method sidebar element
   */
  renderMethodElement: function(methodElement, mainObject, classArray){
    this.addClasses(methodElement, classArray);
    renderSideBarText(methodElement, mainObject);
  }
}
export { DomUtils };