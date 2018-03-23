let DOMNodeCollection = require("./dom_node_collection");

window.$l = function(selector) {
  if (selector instanceof HTMLElement){
    return new DOMNodeCollection(Array.from(selector));
  } else if (selector instanceof Function) {
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', selector);
    } else {
      selector();
    }
  } else {
    let nodeList = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodeList);
  }
};

window.$l.extend = function(obj1, obj2, ...objs) {
  Object.keys(obj2).forEach(function (key) {
    obj1[key] = obj2[key];
  });
  if (objs.length !== 0) {
    window.$l.extend(obj1, ...objs);
  } else {
    return obj1;
  }
};

window.$l.ajax = function(options) {
  let xhr = new XMLHttpRequest;
  const method = options.method;
  const url = options.url;

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log('Success!');
      } else {
        console.log("Error!");
      }
    }
  };

  xhr.open(method, url);
  xhr.send();
};
