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
  SAVE_SELECTOR,
  ERROR_STATUS_CLASS,
  SUCCESS_STATUS_CLASS,
  HISTORY_SELECTOR,
  HISTORY_ELEMENTS_SELECTOR,
  CLEAR_HISTORY_SELECTOR,
  SAVED_SELECTOR,
  SAVED_DELETE_ELEMENTS_SELECTOR,
  COLLAPSIBLE_ELEMENTS_SELECTOR,
  SIDE_NAV_ELEMENTS_SELECTOR,
  REMOVE_SAVED_ICON_CLASSES,
  REMOVE_SAVED_BUTTON_CLASSES,
  SIDE_BAR_ELEMENT_CLASSES,
  EMPTY_PERSIST_OBJECT
}from "./../js/constants.js";

describe('Constants specs running', ()=>{
  it('All constants to have correct values', () => {
    expect(BASE_URL_SELECTOR).toBe('baseurl');
    expect(URL_SELECTOR).toBe('url');
    expect(RESPONSE_HEADER_SELECTOR).toBe('responseH');
    expect(RESPONSE_BODY_SELECTOR).toBe('responseB');
    expect(EXEC_TIME_SELECTOR).toBe('executiontime');
    expect(HEADERS_SELECTOR).toBe('headers');
    expect(BODY_SELECTOR).toBe('body');
    expect(METHODS_SELECTOR).toBe('methods');
    expect(SELECT_TAG_SELECTOR).toBe('select');
    expect(REQUEST_SELECTOR).toBe('req');
    expect(STATUS_SELECTOR).toBe('status');
    expect(SAVE_SELECTOR).toBe('save');
    expect(HISTORY_SELECTOR).toBe('history');
    expect(SAVED_SELECTOR).toBe('saved');
    expect(COLLAPSIBLE_ELEMENTS_SELECTOR).toBe('.collapsible');
    expect(SIDE_NAV_ELEMENTS_SELECTOR).toBe('.sidenav');
    expect(REMOVE_SAVED_ICON_CLASSES).toEqual(["material-icons", "black-text", "white", "right"]);
    expect(REMOVE_SAVED_BUTTON_CLASSES).toEqual(["col", "s1", "btn", "black-text", "white", "z-depth-0"]);
    expect(SIDE_BAR_ELEMENT_CLASSES).toEqual(['waves-effect', 'black-text']);
    expect(SAVED_DELETE_ELEMENTS_SELECTOR).toBe('#saved a.btn');
    expect(ERROR_STATUS_CLASS).toEqual(['chip', 'red', 'white-text', 'rounded', 'right']);
    expect(SUCCESS_STATUS_CLASS).toEqual(['chip', 'green', 'white-text', 'rounded', 'right']);
    expect(HISTORY_ELEMENTS_SELECTOR).toBe('#history > div');
    expect(CLEAR_HISTORY_SELECTOR).toBe('clearhistory');
    expect(EMPTY_PERSIST_OBJECT).toEqual({ history: [], saved: [] });
  });
});