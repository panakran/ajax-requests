const APP_KEY = 'AJAX_REQUESTS_APP_OBJECT';

const Persist = {
  
  
  saveToLocalStorage: (AJAX_REQUESTS_APP_OBJECT) =>{
    localStorage.setItem(APP_KEY,  JSON.stringify(AJAX_REQUESTS_APP_OBJECT));
  },
  
  loadFromLocalStorage: () =>{
    return JSON.parse(localStorage.getItem(APP_KEY));
  },
  clearLocalStorage: () =>{
    localStorage.removeItem(APP_KEY);
  },
  addHistoryObject: function(obj){
    let temp = JSON.parse(localStorage.getItem(APP_KEY));
    temp.history.push(obj);
    Persist.saveToLocalStorage(temp);
    return obj;
  },
  addSavedObject: function(obj){
    let temp = JSON.parse(localStorage.getItem(APP_KEY));
    temp.saved.push(obj);
    Persist.saveToLocalStorage(temp);
    return obj;
  },
  clearHistory: function(){
    let temp = JSON.parse(localStorage.getItem(APP_KEY));
    temp.history = [];
    Persist.saveToLocalStorage(temp);
  },
  clearSavedObjectByIndex: function(index){
    let temp = JSON.parse(localStorage.getItem(APP_KEY));
    temp.saved.splice(index, 1);
    Persist.saveToLocalStorage(temp);
  }
};
export { Persist };