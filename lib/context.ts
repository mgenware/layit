export default class Context {
  public children: Element[];
  public tagName: string;

  constructor(
    public element: Element,
    public defaultHandler: (element: Element) => object,
  ) {
    this.tagName = element.tagName;
    this.children = this.nodeListToArray(element.childNodes);
  }

  handleDefault(element: Element): object {
    return this.defaultHandler(element);
  }

  spawn(element: Element): Context {
    return new Context(element, this.defaultHandler);
  }

  private nodeListToArray(nodeList: NodeList): Element[] {
    if (nodeList && nodeList.length) {
      const ret: Element[] = [];
      for (let i = 0; i < nodeList.length; i++) {
        ret.push(nodeList.item(i) as Element);
      }
      return ret;
    }
    return [];
  }
}
