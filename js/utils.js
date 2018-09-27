/**
* Executes a funciton passed with its params if exeption throwed return the first param passed
* @param {type} func
* @param {type} params
* @return {unresolved}
*/
const catchJsonException = (func, ...params) => {
  try {
    return func(...params);
  } catch (e) {
    return params;
  }
};

const Utils = {
  /**
  * Executes native JSON.stringify but with error catching
  * @param {type} value
  */
  stringifyJSON: (value) => {
    return catchJsonException(JSON.stringify, value, undefined, 4);
  },
  
  /**
  * Executes native JSON.parse but with error catching
  * @param {type} value
  */
  parseJSON: (value) => {
    return catchJsonException(JSON.parse, value);
  },
  
  /**
  * prints error messages to DOM through passed func
  * @param {type} msgFunc
  * @param {type} msg
  */
  printErrorMessage: (msgFunc, msg) => {
    msgFunc({classes: 'rounded card-panel red white-text text-darken-4 z-depth-5', html: `<p><code>${msg}</code></p>`});
  },
  
  /**
  * create text that will render to timer element
  * @param {type} time
  * @return {String}
  */
  createTimerText: (time) => {
    return `${(time).toFixed(2)}ms`;
  },
  
  /**
  * create text that will render to status element
  * @param {type} time
  * @return {String}
  */
  createStatusText: (text) => {
    return `Status : ${text}`;
  },
  
  /**
  * calculate exec time based on start and end time(simple sub)
  * @param {type} endT
  * @param {type} startT
  * @return {Number}
  */
  getExecTime: (startT) => {
    return performance.now() - startT;
  },
  extractFloat: (str) => Number(str.replace("ms", "").replace(/[^0-9\.]+/g,"")),
  extractStatusCode: (str) => str.replace("Status : ", "")
};

export { Utils };
