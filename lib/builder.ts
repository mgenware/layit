import defs from './defs';
import Handler from './handler';
import Context from './context';
import { DOMParser } from 'xmldom';
import { outerXML } from './util';

export class Builder {
  static elementFromXML(xml: string): Element {
    const parser = new DOMParser();
    const root = parser.parseFromString(xml).documentElement;

    if (!root) {
      throw new Error(`No root element found, empty string or invalid HTML encountered`);
    }
    return root;
  }

  constructor(
    public handler: Handler,
  ) { }

  build(element: Element): any {
    // Validate root element
    if (element.tagName !== defs.rootTagName) {
      throw new Error(`Root tag element must be "${defs.rootTagName}", got "${element.tagName}".`);
    }

    const rootCtx = new Context(element, this.handleContextCallback.bind(this));
    if (rootCtx.children.length > 1) {
      throw new Error(`<layit> can only contain at most 1 child element, got ${rootCtx.children.length}, XML: ${outerXML(rootCtx.element)}`);

    }
    if (rootCtx.children.length < 1) {
      throw new Error(`No child elements found in <layit>`);
    }
    return this.handleElement(rootCtx.children[0]);
  }

  private handleElement(element: Element): any {
    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    // Create the context
    const ctx = new Context(element, this.handleContextCallback.bind(this));
    // Invoke handleElement
    return this.handler.handleElement(ctx);
  }

  private handleContextCallback(element: Element): any {
    return this.handleElement(element);
  }
}
