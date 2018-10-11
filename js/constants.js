/**
* Css selectors constants
*/
const BASE_URL_SELECTOR = 'baseurl';
const URL_SELECTOR = 'url';
const RESPONSE_HEADER_SELECTOR = 'responseH';
const RESPONSE_BODY_SELECTOR = 'responseB';
const EXEC_TIME_SELECTOR = 'executiontime';
const HEADERS_SELECTOR = 'headers';
const BODY_SELECTOR = 'body';
const METHODS_SELECTOR = 'methods';
const SELECT_TAG_SELECTOR = 'select';
const REQUEST_SELECTOR = 'req';
const STATUS_SELECTOR = 'status';
const SAVE_SELECTOR = 'save';
const HISTORY_SELECTOR = 'history';
const CLEAR_ALL_SELECTOR = 'clearAll';
const HISTORY_ELEMENTS_SELECTOR = '#history > div';
const CLEAR_HISTORY_SELECTOR = 'clearhistory';
const SAVED_SELECTOR = 'saved';
const SAVED_DELETE_ELEMENTS_SELECTOR = '#saved a.btn';
const COLLAPSIBLE_ELEMENTS_SELECTOR = '.collapsible';
const SIDE_NAV_ELEMENTS_SELECTOR = '.sidenav';
/**
* Class apply constants
*/
const ERROR_STATUS_CLASS = ['chip', 'red', 'white-text', 'rounded', 'right'];
const SUCCESS_STATUS_CLASS = ['chip', 'green', 'white-text', 'rounded', 'right'];
const REMOVE_SAVED_ICON_CLASSES = ["material-icons", "black-text", "white", "right"];
const REMOVE_SAVED_BUTTON_CLASSES = ["col", "s1", "btn", "black-text", "white", "z-depth-0"];
const SIDE_BAR_ELEMENT_CLASSES = ['waves-effect', 'black-text'];
/**
* Object constants
*/
const EMPTY_PERSIST_OBJECT = { history: [], saved: []};

export {
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
  SAVE_SELECTOR,
  ERROR_STATUS_CLASS,
  SUCCESS_STATUS_CLASS,
  HISTORY_SELECTOR,
  HISTORY_ELEMENTS_SELECTOR,
  CLEAR_HISTORY_SELECTOR,
  SAVED_SELECTOR,
  CLEAR_ALL_SELECTOR,
  SAVED_DELETE_ELEMENTS_SELECTOR,
  COLLAPSIBLE_ELEMENTS_SELECTOR,
  SIDE_NAV_ELEMENTS_SELECTOR,
  REMOVE_SAVED_ICON_CLASSES,
  REMOVE_SAVED_BUTTON_CLASSES,
  SIDE_BAR_ELEMENT_CLASSES,
  EMPTY_PERSIST_OBJECT
};
