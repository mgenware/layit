import defs from './defs';
import Handler from './handler';
import Context from './context';
import BuiltinValidator from './internal/builtinValidator';

export class Builder {
  static elementFromXML(xml: string): Element {
    const parser = new DOMParser();
    return parser.parseFromString(xml, 'application/xml').documentElement;
  }

  private builtinValidator: BuiltinValidator;

  constructor(
    public handler: Handler,
  ) {
    this.builtinValidator = new BuiltinValidator();
  }

  build(element: Element): object {
    const children = [...element.children];
    return children.map((c) => this.handleElement(c));
  }

  private handleElement(element: Element): object {
    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    const children = [...element.children];
    this.builtinValidator.validate(element, children);

    // Create the context
    const ctx = new Context(element, this.handleContextCallback);
    if (name[0] === name[0].toUpperCase()) {
      // External or Ref
      return this.handleExternal(ctx);
    } else {
      // builtin
      // tslint:disable-next-line no-any
      const isBuiltin = (defs.builtin as any)[name];
      if (!isBuiltin) {
        throw new Error(`The element "${name}" is not a builtin element`);
      }
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
