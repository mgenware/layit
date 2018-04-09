export default class Context {
  public childElements: Element[];
  public tagName: string;

  constructor(
    public document: Document,
    public element: Element,
    public defaultHandler: (element: Element) => object,
  ) {
    this.tagName = element.tagName;
    this.childElements = [...element.children];
  }

  handleDefault(element: Element): object {
    if (!element) {
      throw new Error('The element parameter is not specified');
    }

    return this.defaultHandler(element);
  }

  spawn(element: Element): Context {
    return new Context(this.document, element, this.defaultHandler);
  }
}
