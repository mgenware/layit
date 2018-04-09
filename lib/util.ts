export default class Util {
  static outerXML(element: Element): string {
    this.checkElement(element);
    return element.outerHTML;
  }

  static rootElementFromDocument(document: Document): Element|null {
    this.checkDocument(document);
    if (!document.body) {
      throw new Error('document.body is undefined');
    }
    return document.body.firstElementChild;
  }

  static getAndRemoveAttribute(element: Element, name: string): string {
    this.checkElement(element);
    const attr = element.getAttribute(name) || '';
    element.removeAttribute(name);
    return attr;
  }

  private static checkDocument(document: Document) {
    if (!document) {
      throw new Error('Undefined document parameter');
    }
  }

  private static checkElement(element: Element) {
    if (!element) {
      throw new Error('Undefined element parameter');
    }
  }
}
