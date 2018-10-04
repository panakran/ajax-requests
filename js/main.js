import { Dom } from './dom.js';
import { InitializeMaterializeElements, InitializePersistObj } from './initialize.js';
import { EventHandlers } from './event-handlers.js';
const R = require("ramda");
const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  /** 
  * Initialize application
  */
 InitializeMaterializeElements();
  R.compose(EventHandlers.initialize,Dom.renderPersistObject)(InitializePersistObj());
});