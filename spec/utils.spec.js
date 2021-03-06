
import { Utils } from "./../js/utils.js";

describe('Utils specs running', ()=>{
  
  it('extractFloat on 1232.323232ms', () => {
    const result = Utils.extractFloat("1232.323232ms");
    expect(result).toBe(1232.323232);
  });
  
  it('extractStatusCode on Status : 404', () => {
    const result = Utils.extractStatusCode("Status : 404");
    expect(result).toBe("404");
  });
  
  it('createStatusText with input 404', () => {
    const result1 = Utils.createStatusText(404);
    const result2 = Utils.createStatusText("404");
    expect(result1).toBe("Status : 404");
    expect(result2).toBe("Status : 404");
  });
  
  it('createTimerText with input 111.4444 and 222.5', () => {
    const result1 = Utils.createTimerText(111.4444);
    const result2 = Utils.createTimerText(222.5);
    expect(result1).toBe("111.44ms");
    expect(result2).toBe("222.50ms");
  });
  
  it('stringifyJSON with input an object', () => {
    const result1 = Utils.stringifyJSON({"prop1":1 ,"prop2": "2"});
    expect(result1).toBe(`{
    "prop1": 1,
    "prop2": "2"
}`);
  });
  
  it('parseJSON with input an string', () => {
    const result1 = Utils.parseJSON(`{
      "prop1": 1,
      "prop2": "2"
    }`);
    expect(result1).toEqual({"prop1":1 ,"prop2": "2"});
  });
  
  it('generateUID to generate different numbers', () => {
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
    expect(Utils.generateUID()).not.toEqual(Utils.generateUID());
  });
  it('findIdIndex on array with id prop', () => {
    const objArray = [
      {id:1, other:"dsdsfsa"},
      {id:2, other:"dsdsafsf"},
      {id:3, other:"dsdafss"},
      {id:4, other:"dfsdasds"}
    ]
    expect(Utils.findIdIndex(objArray, 3)).toEqual(2);
  });
  it('createObjectArray return always an array', () => {
    const objArray1 = [
      {id:1, other:"dsdsfsa"},
      {id:2, other:"dsdsafsf"},
      {id:3, other:"dsdafss"},
      {id:4, other:"dfsdasds"}
    ]
    const objArray2 = {id:1, other:"dsdsfsa"};

    expect(Utils.createObjectArray(objArray1).constructor).toEqual(Array);
    expect(Utils.createObjectArray(objArray2).constructor).toEqual(Array);
  });
  it('compose to make composition of N functions', () => {
    const f1 = (arg1, arg2) => arg1+arg2+1 ;
    const f2 = (arg1) => arg1*2 ;
    const f3 = (arg1) => arg1+2 ;

    expect(Utils.compose(f3, f2, f1)(2, 2)).toBe(12);
  });
});
