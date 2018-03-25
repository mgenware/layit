import defs from './defs';
import Handler from './handler';
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

  build(element: Element) {
    const children = element.children;
    for (const child of [...children]) {
      this.handleElement(child);
    }
  }

  private handleElement(element: Element) {
    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    const children = [...element.children];
    this.builtinValidator.validate(element, children);

    if (name[0] === name[0].toUpperCase()) {
      // External or Ref

    } else {
      // builtin
      // tslint:disable-next-line no-any
      const isBuiltin = (defs.builtin as any)[name];
      if (!isBuiltin) {
        throw new Error(`The element "${name}" is not a builtin element`);
      }

      // Validate builtin element
      this.handleBuiltin(element);
    }
  }

  private handleBuiltin(element: Element) {
    this.handler.handleBuiltin(element);
  }

  private handleExternal(element: Element) {
    this.handler.handleExternal(element);
  }
}
