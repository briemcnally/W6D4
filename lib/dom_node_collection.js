class DOMNodeCollection {
  constructor(arr){
    this.nodes = arr;
  }

  html(string) {
    if (string === undefined) {
      return this.nodes[0].innerHTML;
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(arg) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (typeof arg === 'string') {
        let element = document.createElement(arg);
        this.nodes[i].appendChild(element);

      } else if (arg instanceof DOMNodeCollection) {
        for (var j = 0; j < arg.nodes.length; j++) {
          this.nodes[i].appendChild(arg.nodes[j].cloneNode(true));
        }

      } else if (arg instanceof HTMLElement) {
        this.nodes[i].appendChild(arg.outerHTML);
      }
    }
  }

  attr(attr_name, value) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (value === undefined) {
        if (this.nodes[i].attributes.getNamedItem(attr_name) !== null) {
          return this.nodes[i].attributes.getNamedItem(attr_name);
        }
      } else {
        let newAttr = document.createAttribute(attr_name);
        newAttr.value = value;
        this.nodes[i].attributes.setNamedItem(newAttr);
      }
    }
  }

  addClass(name) {
    this.attr('class', name);
  }

  removeClass(name) {
    for (var i = 0; i < this.nodes.length; i++) {
      console.log('for');
      console.log(this.nodes[i].attributes.class.value);
      if (this.nodes[i].attributes.class.value === name) {
        console.log('inner if');
        this.nodes[i].removeAttribute('class');
      }
    }
  }

  children() {
    let result = [];

    for (var i = 0; i < this.nodes.length; i++) {
      result.push(this.nodes[i].children);
    }

    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];

    for (var i = 0; i < this.nodes.length; i++) {
      result.push(this.nodes[i].parentElement);
    }

    return new DOMNodeCollection(result);
  }

  find(selector) {
    let result = [];

    for (var i = 0; i < this.nodes.length; i++) {
      result.push(this.nodes[i].querySelectorAll(selector));
    }

    return new DOMNodeCollection(result);
  }

  remove() {
    this.empty();
    this.node = [];
  }

  on(type, callback) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].addEventListener(type, callback);
      this.nodes[i].event = {type: type, callback: callback};
    }
  }

  off(type) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].event.type === type) {
        this.nodes[i].removeEventListener(type, this.nodes[i].event.callback);
      }
    }
  }
}



module.exports = DOMNodeCollection;
