import M from 'materialize-css';
import { SELECT_TAG_SELECTOR, EMPTY_PERSIST_OBJECT, COLLAPSIBLE_ELEMENTS_SELECTOR, SIDE_NAV_ELEMENTS_SELECTOR } from './constants.js';
import { AcUtils } from './autocomplete.js';
import { Persist } from './persist.js'

/**
 * Initialize method
 * 1. Initialize dom elements object
 * 2.initialize autocomplete elements
 * 3.initializes rest of M elements (FormSelect, Collapsible, Sidenav)
 * 
 * @param {*} document 
 */
const InitializeMaterializeElements = () => {
  AcUtils.initialize();
  M.FormSelect.init(document.querySelectorAll(SELECT_TAG_SELECTOR));
  const collapsibleElems = document.querySelectorAll(COLLAPSIBLE_ELEMENTS_SELECTOR);
  M.Collapsible.init(collapsibleElems);
  const sidenavElems = document.querySelectorAll(SIDE_NAV_ELEMENTS_SELECTOR);
  M.Sidenav.init(sidenavElems);
};

/**
 * Initializes persist object if no value on local storage creates an empty one
 * sets window listener on refresh close to persist objectto local storage
 */
const InitializePersistObj = ()=>{
  let data = Persist.loadFromLocalStorage();
  let persistObject;
  if (data === null){

    persistObject = EMPTY_PERSIST_OBJECT;
    Persist.saveToLocalStorage(persistObject);
  }else{
    persistObject = data;
  }
  return persistObject;
}

export { InitializeMaterializeElements, InitializePersistObj };