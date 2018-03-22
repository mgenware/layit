import defs from '../defs';

export default class BuiltinValidator {
  private validators: { [key: string]: (element: Element, children: Element[]) => void } = {};

  constructor() {
    const { validators } = this;
    const { builtin } = defs;
    validators[builtin.h] = this.hasChild;
    validators[builtin.v] = this.hasChild;
  }

  validate(element: Element, children: Element[]) {
    const tagName = element.tagName;
    const func = this.validators[tagName];
    if (func) {
      func(element, children);
    }
  }

  private hasChild(element: Element, children: Element[]) {
    if (children.length <= 0) {
      throw new Error('Element must have at least one child');
    }
  }
}
