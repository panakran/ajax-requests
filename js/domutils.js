import { ERROR_STATUS_CLASS, SUCCESS_STATUS_CLASS, EXEC_TIME_SELECTOR, STATUS_SELECTOR, SIDE_BAR_ELEMENT_CLASSES, REMOVE_SAVED_ICON_CLASSES, REMOVE_SAVED_BUTTON_CLASSES } from './constants';
import { Utils } from "./utils.js";
import { Persist } from './persist';


/**
* render new value to innerHTML
* @param {type} element
* @param {type} newValue
*/
const renderNewInnerHTML = (element, newValue) => {
  element.innerHTML = newValue;
};

const getIndex = (id) =>Utils.findIdIndex(Persist.loadFromLocalStorage().saved, id);

/**
* onclick handler method for saved elements on pressing delete
*/
const clearSaved = (elem, id)=>{
  return ()=>{
    if(confirm("Delete saved?")){
      Utils.compose(Persist.clearSavedObjectByIndex, getIndex)(id)
      DomUtils.removeParentElement(elem);
    }
  }
};

/**
* render new status and apply classes
* @param {type} element
* @param {type} newValue
*/
const addClassAndRender = function(element, newValue, newClassesToApply) {
  DomUtils.addClasses(element, newClassesToApply);
  renderNewInnerHTML(element, Utils.createStatusText(newValue));
};

const getColorByStatus = (status) => status<400?"green":"red";

const renderInnerHTMLText = (methodElement, mainObject) => {
  methodElement.innerHTML = `<span class="${getColorByStatus(mainObject.status)}-text">${mainObject.method}</span> - ${mainObject.baseURL}${mainObject.url}`;
  return methodElement;
};

const addSideBarTextClasses = (element)=>{
  DomUtils.addClasses(element, SIDE_BAR_ELEMENT_CLASSES);
  return element;
}
/**
* Renders a side bar element and sets color to green/red based on success/error response
* @param {*} methodElement 
* @param {*} mainObject 
*/
const renderSideBarText = (methodElement, mainObject)=>{
  Utils.compose(addSideBarTextClasses,renderInnerHTMLText)(methodElement, mainObject);
}

const DomUtils = {
  /**
  * render new value to status element
  * @param {type} element
  * @param {type} newValue
  */
  renderStatusTag: function(newValue) {
    console.log(newValue)
    let element = document.getElementById(STATUS_SELECTOR);
    element.classList = [];
    newValue < 400
    ? addClassAndRender(element, newValue, SUCCESS_STATUS_CLASS)
    : addClassAndRender(element, newValue, ERROR_STATUS_CLASS);
  },
  
  /**
  * render new value to timer element
  */
  renderTimerTag: (newValue)=>
  document.getElementById(EXEC_TIME_SELECTOR).innerHTML = Utils.createTimerText(newValue),
  /**
  * removes parent and himself of an element 
  */
  removeParentElement: (element) => element.parentElement.parentElement.removeChild(element.parentElement),
  /**
  * add class shorthand
  */
  addClasses: (element, classArray) => {
    element.classList.add(...classArray);
    return element;
  },
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
  removeElementsBySelector:(selector)=>{
    [...document.querySelectorAll(selector)]
    .forEach(x=>x.parentNode.removeChild(x));
  },
  /**
  * renders a method sidebar element
  */
  renderMethodElement: (methodElement, mainObject, classArray)=> {
    DomUtils.addClasses(methodElement, classArray);
    renderSideBarText(methodElement, mainObject)
  },
  
  createDeleteButtonElement:(obj, savedObject)=>{
    let deleteButton = DomUtils.createElement('a');
    deleteButton.setAttribute("href", "#");
    deleteButton.onclick = clearSaved(deleteButton, savedObject.id);
    deleteButton.setAttribute("id", savedObject.id);
    DomUtils.addClasses(deleteButton,REMOVE_SAVED_BUTTON_CLASSES);
    return {...obj, deleteButton };
  },
  createIconElement:(obj)=>{
    let icon = DomUtils.createElement('i');
    DomUtils.addClasses(icon, REMOVE_SAVED_ICON_CLASSES);
    icon.innerHTML = "clear";
    return {...obj, icon};
  },
  /**
  * create element shorthand
  */
  createElement: (tag)=>
  document.createElement(tag)
}
export { DomUtils };