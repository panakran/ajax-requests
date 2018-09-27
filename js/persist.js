const Persist = {
  
  saveToLocalStorage: (AJAX_REQUESTS_APP_OBJECT) =>{
    console.log(AJAX_REQUESTS_APP_OBJECT);
    localStorage.setItem('AJAX_REQUESTS_APP_OBJECT',  JSON.stringify(AJAX_REQUESTS_APP_OBJECT))
  },
  
  loadFromLocalStorage: () =>{
    
    console.log(JSON.parse(localStorage.getItem('AJAX_REQUESTS_APP_OBJECT')));
    return JSON.parse(localStorage.getItem('AJAX_REQUESTS_APP_OBJECT'));
  },
  clearLocalStorage: () =>
  localStorage.removeItem('AJAX_REQUESTS_APP_OBJECT')
};
export { Persist };