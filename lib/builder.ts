import defs from './defs';
import Handler from './handler';
import Context from './context';
import Util from './util';
import { JSDOM } from 'jsdom';
const DOCUMENT_NODE = 9;

export class Builder {
  static documentFromXML(xml: string): Document {
    const dom = new JSDOM(xml);
    return dom.window.document;
  }

  private document: Document;

  constructor(
    public handler: Handler,
  ) { }

  build(document: Document): any {
    if (!document) {
      throw new Error('The document parameter is not specified');
    }
    if (!(document.nodeType && document.nodeType === DOCUMENT_NODE)) {
      throw new Error(`The document is not an instance of Document class`);
    }
    this.document = document;

    // Validate root element
    const rootElement = Util.rootElementFromDocument(document);
    if (!rootElement) {
      throw new Error(`No root element found, empty string or invalid HTML encountered`);
    }
    if (rootElement.tagName !== defs.layit.toUpperCase()) {
      throw new Error(`Root tag element must be "${defs.layit}", got "${rootElement.tagName}".`);
    }

    const rootCtx = new Context(document, rootElement, this.handleContextCallback.bind(this));
    if (rootCtx.childElements.length > 1) {
      throw new Error(`<layit> can only contain at most 1 child element, got ${rootCtx.childElements.length}, XML: ${Util.outerXML(rootCtx.element)}`);
    }
    if (rootCtx.childElements.length < 1) {
      throw new Error(`No child elements found in <layit>`);
    }
    return this.handleElement(rootCtx.childElements[0]);
  }

  private handleElement(element: Element): any {
    if (!element) {
      throw new Error('The element parameter is not specified');
    }

    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    // Create the context
    const ctx = new Context(this.document, element, this.handleContextCallback.bind(this));
    // Handle the element
    return this.handler.handleElement(ctx);
  }

  private handleContextCallback(element: Element): any {
    return this.handleElement(element);
  }
}
