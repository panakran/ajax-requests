const Persist = {
  
  saveToLocalStorage: (AJAX_REQUESTS_APP_OBJECT) =>{
    localStorage.setItem('AJAX_REQUESTS_APP_OBJECT',  JSON.stringify(AJAX_REQUESTS_APP_OBJECT))
  },
  
  loadFromLocalStorage: () =>{
    return JSON.parse(localStorage.getItem('AJAX_REQUESTS_APP_OBJECT'));
  },
  clearLocalStorage: () =>
  localStorage.removeItem('AJAX_REQUESTS_APP_OBJECT')
};
export { Persist };