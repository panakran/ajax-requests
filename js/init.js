import M from 'materialize-css';
import { SELECT_TAG_SELECTOR } from './constants.js';
import { Dom } from './dom.js';
import { AcUtils } from './autocomplete.js';
import { Persist } from './persist.js'

/**
* Initialize method sets up the select dropdown
*/
const InitializeDom = (document) => {
  Dom.initialize();
  AcUtils.initialize();
  M.FormSelect.init(document.querySelectorAll(SELECT_TAG_SELECTOR));
  const collapsibleElems = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsibleElems);
  const sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems);
};
const InitializePersistObj = ()=>{
  let data = Persist.loadFromLocalStorage();
  let persistObject;
  if (data === null){
    persistObject = EMPTY_PERSIST_OBJECT;
  }else{
    persistObject = data;
  }
  Dom.renderPersistObject(persistObject);
  window.onbeforeunload = () => Persist.saveToLocalStorage(persistObject);
  return persistObject;
}

export { InitializeDom, InitializePersistObj };