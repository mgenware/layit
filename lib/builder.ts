import defs from './defs';
import Handler from './handler';
import Context from './context';

export class Builder {
  static elementFromXML(xml: string): Element {
    const parser = new DOMParser();
    const body = parser.parseFromString(xml, 'text/html').body;

    if (!body || !body.firstElementChild) {
      throw new Error(`No root element found, empty string or invalid HTML encountered`);
    }
    if (body.childElementCount > 1) {
      throw new Error(`Only 1 root element is allowed, got ${body.childElementCount}.`);
    }
    return body.firstElementChild;
  }

  constructor(
    public handler: Handler,
  ) { }

  build(element: Element): any {
    // Validate root element
    if (element.tagName.toLowerCase() !== defs.rootTagName) {
      throw new Error(`Root tag element must be "${defs.rootTagName}", got "${element.tagName}".`);
    }

    const children = [...element.children] || [];
    if (children.length > 1) {
      throw new Error(`<layit> can only contain at most 1 child element`);
    }
    if (children.length < 1) {
      throw new Error(`No child elements found in <layit>`);
    }
    return this.handleElement(children[0]);
  }

  private handleElement(element: Element): object {
    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    // Create the context
    const ctx = new Context(element, this.handleContextCallback.bind(this));
    return this.handler.handleElement(ctx);
  }

  private handleContextCallback(element: Element): object {
    return this.handleElement(element);
  }
}
