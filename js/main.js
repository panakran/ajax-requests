import { Dom } from './dom.js';
import { InitializeMaterializeElements, InitializePersistObj } from './initialize.js';
import { EventHandlers } from './event-handlers.js';
import { Utils } from "./utils.js";


const ready = (fn) =>
document.readyState !== 'loading'
? fn()
: document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  /** 
  * Initialize application
  */
 InitializeMaterializeElements();
 Utils.compose(EventHandlers.initialize, Dom.renderPersistObject)(InitializePersistObj());
});