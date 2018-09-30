import { Dom } from './dom.js';
import { InitializeDom, InitializePersistObj } from './initialize.js';
import { EventHandlers } from './event-handlers.js';
import { Persist } from './persist.js';

const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  /** 
  * Initialize application
  */
  let persistObject  = InitializePersistObj();
  Dom.renderPersistObject(persistObject);
  InitializeDom(document);
  EventHandlers.initialize(persistObject);
  window.onbeforeunload = () => Persist.saveToLocalStorage(persistObject);
});