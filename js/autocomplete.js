import M from 'materialize-css';
import { BASE_URL_SELECTOR, URL_SELECTOR } from './constants';

let autocompleteinstanceBaseUrl;
let autocompleteinstanceUrl;
const AcUtils = {
  /**
  * inits tha autocomple instances
  */
  initialize: () => {
    const baseURLElement = document.getElementById(BASE_URL_SELECTOR);
    const urlElement = document.getElementById(URL_SELECTOR);
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
