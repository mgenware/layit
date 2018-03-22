import defs from './defs';
import Handler from './handler';
import BuiltinValidator from './internal/builtinValidator';

export class Builder {
  private builtinValidator: BuiltinValidator;

  constructor(
    public handler: Handler,
  ) {
    this.builtinValidator = new BuiltinValidator();
  }

  build(element: Element) {
    const children = element.children;
    for (const child of [...children]) {
      this.handleChild(child);
    }
  }

  private handleChild(element: Element) {
    const name = element.tagName;
    if (name.length <= 0) {
      throw new Error('Element.tagName is empty');
    }
    const children = [...element.children];

    if (name[0] === name[0].toUpperCase()) {
      // external name or ref
    } else {
      // builtin
      // tslint:disable-next-line no-any
      const isBuiltin = (defs.builtin as any)[name];
      if (!isBuiltin) {
        throw new Error(`The element "${name}" is not a builtin element`);
      }

      // Validate builtin element
      this.handleBuiltin(element, children);
    }
  }

  private handleBuiltin(element: Element, children: Element[]) {
    this.builtinValidator.validate(element, children);
  }
}
