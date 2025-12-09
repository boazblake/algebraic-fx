export class FakeNode {
  constructor(tag) {
    this.tag = tag; // string | "#"
    this.children = [];
    this.parentNode = null;
    this.attributes = {};
    this.nodeValue = tag === "#" ? "" : null;
    this.namespaceURI = null;
    this.ownerDocument = null; // <-- !! critical
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const i = this.children.indexOf(child);
    if (i !== -1) {
      this.children.splice(i, 1);
      child.parentNode = null;
    }
    return child;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }
}

export class FakeDocument {
  constructor() {
    this.documentElement = new FakeNode("html");
    this.documentElement.ownerDocument = this;

    this.body = new FakeNode("body");
    this.body.ownerDocument = this;
    this.documentElement.appendChild(this.body);

    // simple id registry simulation
    this._idMap = {};
  }

  createElement(tag) {
    const n = new FakeNode(tag);
    n.ownerDocument = this; // <-- IMPORTANT
    return n;
  }

  createElementNS(ns, tag) {
    const n = new FakeNode(tag);
    n.ownerDocument = this;
    n.namespaceURI = ns;
    return n;
  }

  createTextNode(text) {
    const n = new FakeNode("#");
    n.nodeValue = text;
    n.ownerDocument = this;
    return n;
  }

  getElementById(id) {
    if (!this._idMap[id]) {
      const el = this.createElement("div");
      el.ownerDocument = this;
      this._idMap[id] = el;
    }
    return this._idMap[id];
  }
}
