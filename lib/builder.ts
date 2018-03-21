import defs from './defs';
import Handler from './handler';

export class Builder {
  constructor(
    public handler: Handler,
  ) { }

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

    if (name[0] === name[0].toUpperCase()) {
      // external name or ref
    } else {
      // builtin
      // tslint:disable-next-line no-any
      const isBuiltin = (defs.builtin as any)[name];
      if (!isBuiltin) {
        throw new Error(`The element "${name}" is not a builtin element`);
      }
    }
  }
}
