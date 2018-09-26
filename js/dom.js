import {
  BASE_URL_SELECTOR,
  URL_SELECTOR,
  RESPONSE_HEADER_SELECTOR,
  RESPONSE_BODY_SELECTOR,
  EXEC_TIME_SELECTOR,
  HEADERS_SELECTOR,
  BODY_SELECTOR,
  METHODS_SELECTOR,
  SELECT_TAG_SELECTOR,
  REQUEST_SELECTOR,
  STATUS_SELECTOR,
  ERROR_STATUS_CLASS,
  SUCCESS_STATUS_CLASS,
} from './constants';
import { Utils } from './utils.js';

const renderInputValues = (mainObject)=>{
  const helperFunc=() =>{
    const values = mainObject;
    const inputDOM = Dom.getInputElementsObj();
    const outputDOM = Dom.getOutputElementsObj();
    inputDOM.methodElement.value = values.method;
    // M.FormSelect.init(inputDOM.methodElement);
    
    // options[inputDOM.methodElement.selectedIndex].text
    inputDOM.methodElement.value = values.method
    inputDOM.baseURLElement.focus();
    inputDOM.baseURLElement.value = values.baseURL;
    inputDOM.urlElement.focus();
    inputDOM.urlElement.value = values.url;
    inputDOM.headersElement.focus();
    inputDOM.headersElement.value =  Utils.stringifyJSON(values.headers);
    inputDOM.bodyElement.focus();
    inputDOM.bodyElement.value =  Utils.stringifyJSON(values.data);
    outputDOM.responseElementH.value = Utils.stringifyJSON(values.responseH);
    outputDOM.responseElementB.value = Utils.stringifyJSON(values.responseB);
    outputDOM.timerElement.value =values.execTime;
    outputDOM.statusElement.value =values.status;
  };
  return helperFunc;
};




const Dom = {
  getInputElementsObj: () => {
    return {
      selectElements: document.querySelectorAll(SELECT_TAG_SELECTOR),
      methodElement: document.getElementById(METHODS_SELECTOR),
      baseURLElement: document.getElementById(BASE_URL_SELECTOR),
      urlElement: document.getElementById(URL_SELECTOR),
      headersElement: document.getElementById(HEADERS_SELECTOR),
      bodyElement: document.getElementById(BODY_SELECTOR),
      requestElement: document.getElementById(REQUEST_SELECTOR),
    };
  },
  getOutputElementsObj: () => {
    return {
      responseElementH: document.getElementById(RESPONSE_HEADER_SELECTOR),
      responseElementB: document.getElementById(RESPONSE_BODY_SELECTOR),
      timerElement: document.getElementById(EXEC_TIME_SELECTOR),
      statusElement: document.getElementById(STATUS_SELECTOR)
    };
  },
  
  getInputValues: function() {
    const inputDOM = this.getInputElementsObj();
    const method = inputDOM.methodElement.options[inputDOM.methodElement.selectedIndex].text;
    const baseURL = inputDOM.baseURLElement.value;
    const url = inputDOM.urlElement.value;
    const headers = Utils.parseJSON(inputDOM.headersElement.value);
    const data = Utils.parseJSON(inputDOM.bodyElement.value);
    return {
      method,
      url,
      baseURL,
      data,
      headers,
    };
  },
  getOutputValues: function() {
    const outputDOM = this.getOutputElementsObj();
    const responseH = Utils.parseJSON(outputDOM.responseElementH.value);
    const responseB = Utils.parseJSON(outputDOM.responseElementB.value);
    const execTime = outputDOM.timerElement.value;
    const status = outputDOM.statusElement.value;
    return {
      responseH,
      responseB,
      execTime,
      status,
    };
  },
  
  /**
  * render new value to innerHTML
  * @param {type} element
  * @param {type} newValue
  */
  renderNewInnerHTML: (element, newValue) => {
    element.innerHTML = newValue;
  },
  
  /**
  * render new value to value
  * @param {type} element
  * @param {type} newValue
  */
  renderNewValue: (element, newValue) => {
    element.value = newValue;
  },
  /**
  * render new status and apply classes
  * @param {type} element
  * @param {type} newValue
  */
  addClassAndRender: function(element, newValue, newClassesToApply) {
    element.classList.add(...newClassesToApply);
    this.renderNewInnerHTML(element, Utils.createStatusText(newValue));
  },
  /**
  * render new value to value
  * @param {type} element
  * @param {type} newValue
  */
  renderStatusTag: function(element, newValue) {
    element.classList = [];
    newValue < 400
    ? this.addClassAndRender(element, newValue, SUCCESS_STATUS_CLASS)
    : this.addClassAndRender(element, newValue, ERROR_STATUS_CLASS);
  },
  createElement: function(tag){
    return document.createElement(tag);
  },
  renderSidebarElement:function(persistObject, isHistory){
    const inputs = this.getInputValues();
    const outputs = this.getOutputValues();
    const mainObject = {...inputs, ...outputs};
    
    isHistory
    ?persistObject.history = [...persistObject.history, mainObject]
    :persistObject.saved = [...persistObject.saved, mainObject];
    
    const sideBarElement = Dom.createElement('li');
    const methodElement = Dom.createElement('a');
    methodElement.innerHTML = `${inputs.method.toUpperCase()} : ${inputs.baseURL}${inputs.url}`;
    methodElement.classList.add('waves-effect');
    methodElement.classList.add('black-text');
    sideBarElement.appendChild(methodElement);
    sideBarElement.onclick = renderInputValues(mainObject);

    isHistory
    ?document.getElementById('history').appendChild(sideBarElement)
    :document.getElementById('saved').appendChild(sideBarElement);
  },
  
};

export { Dom };
