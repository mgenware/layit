import defs from './defs';
import Handler from './handler';
import Context from './context';
import { DOMParser } from 'xmldom-alpha-ex';
import { outerXML } from './util';

export class Builder {
  static documentFromXML(xml: string): Document {
    const parser = new DOMParser();
    const document = parser.parseFromString(xml);
    return document;
  }

  private document: Document;

  constructor(
    public handler: Handler,
  ) { }

  build(document: Document): any {
    this.document = document;

    // Validate root element
    if (!document || !document.documentElement) {
      throw new Error(`No root element found, empty string or invalid HTML encountered`);
    }
    const element = document.documentElement;
    if (element.tagName !== defs.layit) {
      throw new Error(`Root tag element must be "${defs.layit}", got "${element.tagName}".`);
    }

    const rootCtx = new Context(document, element, this.handleContextCallback.bind(this));
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
    const ctx = new Context(this.document, element, this.handleContextCallback.bind(this));
    // Handle the element
    if (name[0].toUpperCase() === name[0]) {
      // Elements start with an uppercase letter are considered builtin elements
      return this.handler.handleBuiltin(ctx);
    } else {
      return this.handler.handleExternal(ctx);
    }
  }

  private handleContextCallback(element: Element): any {
    return this.handleElement(element);
  }
}
