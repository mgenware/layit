export default class Context {
  public children: Element[];

  constructor(
    public element: Element,
    public defaultHandler: (element: Element) => object,
  ) {
    this.children = [...this.element.children];
  }

  handleDefault(element: Element): object {
    return this.defaultHandler(element);
  }
}