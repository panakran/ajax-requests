import { Dom } from './dom.js';
import M from 'materialize-css';
let autocompleteinstanceBaseUrl;
let autocompleteinstanceUrl;
const AcUtils = {
  /**
  * inits tha autocomple instances
  */
 initialize: () => {
    const {baseURLElement,urlElement } = Dom.getAutocompleteElements();
    autocompleteinstanceBaseUrl = M.Autocomplete.init(baseURLElement);
    autocompleteinstanceUrl = M.Autocomplete.init(urlElement);
  },
  
  /**
  * adds a new object to autocomplete element
  */
  addToBaseUrl: (newElement) => {
    autocompleteinstanceBaseUrl.updateData({...autocompleteinstanceBaseUrl.options.data, [newElement]: null });
  },
  
  /**
  * adds a new object to autocomplete element
  */
  addToUrl: (newElement) => {
    autocompleteinstanceUrl.updateData({ ...autocompleteinstanceUrl.options.data, [newElement]: null });
  },
  
  /**
  * returns the autocomplete object 
  */
  getAcObject: () => {
    return { autocompleteinstanceBaseUrl, autocompleteinstanceUrl };
  },
  
};
export { AcUtils };
