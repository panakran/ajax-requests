import { DomUtils } from '../js/domutils.js';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"


it('renderTimerTag to render float number', () => {
  const dom = new JSDOM(`<!DOCTYPE html><span>5</span>`);
  let elem = dom.window.document.querySelector("span");
  DomUtils.renderTimerTag(elem, 2.32323);
  expect(elem.innerHTML).toEqual("2.32ms");
});

it('renderStatusTag to render Status : 404', () => {
  const dom = new JSDOM(`<!DOCTYPE html><span></span>`);
  let elem = dom.window.document.querySelector("span");
  DomUtils.renderStatusTag(elem, "404");
  expect(elem.innerHTML).toEqual("Status : 404");
  expect([...elem.classList]).toEqual(['chip', 'red', 'white-text', 'rounded', 'right']);
  DomUtils.renderStatusTag(elem, "200");
  expect(elem.innerHTML).toEqual("Status : 200");
  expect([...elem.classList]).toEqual(['chip', 'green', 'white-text', 'rounded', 'right']);
});

it('removeParentElement to remove parent element and self', () => {
  const dom = new JSDOM(`<!DOCTYPE html><div><p><span>5</span></p></div>`);
  let elem = dom.window.document.querySelector("span");
  DomUtils.removeParentElement(elem);
  expect(dom.window.document.querySelector("p")).toBeNull();
});

it('addClasses to remove parent element and self', () => {
  const dom = new JSDOM(`<!DOCTYPE html><div><p><span>5</span></p></div>`);
  let elem = dom.window.document.querySelector("span");
  DomUtils.addClasses(elem, ["cl1", "cl2"]);
  expect([...elem.classList]).toEqual(["cl1", "cl2"]);
});

it('addClasses to remove parent element and self', () => {
  const dom = new JSDOM(`<!DOCTYPE html><div><p><span>5</span></p></div>`);
  let elem = dom.window.document.querySelector("span");
  DomUtils.addClasses(elem, ["cl1", "cl2"]);
  expect([...elem.classList]).toEqual(["cl1", "cl2"]);
});

it('renderMethodElement to render a new side bar element', () => {
  const dom = new JSDOM(`<!DOCTYPE html><div><p><span>5</span></p></div>`);
  let elem = dom.window.document.querySelector("span");
  let obj = {status: 404, baseURL:"http://www.g.com", url:"/api", method:"GET"}
  DomUtils.renderMethodElement(elem, obj, ["cl1", "cl2"]);
  expect([...elem.classList]).toEqual(["cl1", "cl2", 'waves-effect', 'black-text']);
  expect(elem.innerHTML).toEqual("<span class=\"red-text\">GET</span> - http://www.g.com/api");
});