import {
  BASE_URL_SELECTOR,
  URL_SELECTOR,
  RESPONSE_HEADER_SELECTOR,
  RESPONSE_BODY_SELECTOR,
  EXEC_TIME_SELECTOR,
  HEADERS_SELECTOR,
  BODY_SELECTOR,
  METHODS_SELECTOR,
  STATUS_SELECTOR,
} from './constants';
import { Utils } from './utils';

const Helpers = {
  getMethod : (obj)=> {
    const method = document.getElementById(METHODS_SELECTOR).options[document.getElementById(METHODS_SELECTOR).selectedIndex].text;
    return {...obj, method};
  }, getBaseUrl : (obj)=> {
    const baseURL = document.getElementById(BASE_URL_SELECTOR).value;
    return {...obj, baseURL};
  },
  getUrl : (obj)=> {
    const url = document.getElementById(URL_SELECTOR).value;
    return {...obj, url};
  },
  getHeaders : (obj)=> {
    const headers = Utils.parseJSON(document.getElementById(HEADERS_SELECTOR).value);
    return {...obj, headers};
  },
  getData : (obj)=> {
    const data = Utils.parseJSON(document.getElementById(BODY_SELECTOR).value);
    return {...obj, data};
  },
  getResponseH : (obj)=> {
    const responseH = Utils.parseJSON(document.getElementById(RESPONSE_HEADER_SELECTOR).value);
    return {...obj, responseH};
  },
  getResponseB : (obj)=> {
    const responseB = Utils.parseJSON(document.getElementById(RESPONSE_BODY_SELECTOR).value);
    return {...obj, responseB};
  },
  getExecTime : (obj)=> {
    const execTime =  Utils.extractFloat(document.getElementById(EXEC_TIME_SELECTOR).innerHTML);
    return {...obj, execTime};
  },
  getStatus : (obj)=> {
    const status = Utils.extractStatusCode(document.getElementById(STATUS_SELECTOR).innerHTML);
    return {...obj, status};
  },
  createSuccessObject : (successObject)=>{
    return {
      headers: successObject.axiosConfig.headers[0],
      data: successObject.axiosConfig.data[0],
      baseURL: successObject.axiosConfig.baseURL,
      url: successObject.axiosConfig.url,
      method: successObject.axiosConfig.method,
      responseH: successObject.response.headers,
      responseB: successObject.response.data,
      status: successObject.response.status,
      execTime: successObject.execTime
    };
  },
  createErrorObject : (errorObject)=>{
    return {
      headers: errorObject.axiosConfig.headers[0],
      data: errorObject.axiosConfig.data[0],
      baseURL: errorObject.axiosConfig.baseURL,
      url: errorObject.axiosConfig.url,
      method: errorObject.axiosConfig.method,
      responseH: errorObject.response.response.headers,
      responseB: errorObject.response.response.data,
      status: errorObject.response.response.status,
      execTime: errorObject.execTime
    };
  }
};

export { Helpers };