export default class Context {
  public children: Element[];
  public tagName: string;

  constructor(
    public document: Document,
    public element: Element,
    public defaultHandler: (element: Element) => object,
  ) {
    this.tagName = element.tagName;
    this.children = this.nodeListToArray(element.childNodes);
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

  private nodeListToArray(nodeList: NodeList): Element[] {
    if (nodeList && nodeList.length) {
      const ret: Element[] = [];
      for (let i = 0; i < nodeList.length; i++) {
        const node = nodeList.item(i);
        if (node.nodeType === Node.ELEMENT_NODE) {
          ret.push(nodeList.item(i) as Element);
        }
      }
      return ret;
    }
    return [];
  }
}
