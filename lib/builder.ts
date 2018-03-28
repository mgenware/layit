import defs from './defs';
import Handler from './handler';
import Context from './context';

export class Builder {
  static elementFromXML(xml: string): Element {
    const parser = new DOMParser();
    return parser.parseFromString(xml, 'application/xml').documentElement;
  }

  constructor(
    public handler: Handler,
  ) { }

  build(element: Element): any {
    // Validate root element
    if (element.tagName !== defs.rootTagName) {
      throw new Error(`Root tag element must be ${defs.rootTagName}`);
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
    if (name[0] === name[0].toUpperCase()) {
      // External or Ref
      return this.handleExternal(ctx);
    } else {
      // builtin
      return this.handleBuiltin(ctx);
    }
  }

  private handleBuiltin(ctx: Context): object {
    return this.handler.handleBuiltin(ctx);
  }

  private handleExternal(ctx: Context): object {
    return this.handler.handleExternal(ctx);
  }

  private handleContextCallback(element: Element): object {
    return this.handleElement(element);
  }
}
