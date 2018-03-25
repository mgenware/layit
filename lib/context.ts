export default class Context {
  public children: Element[];
  public tagName: string;

  constructor(
    public element: Element,
    public defaultHandler: (element: Element) => object,
  ) {
    this.tagName = element.tagName;
    this.children = [...this.element.children] || [];
  }

  handleDefault(element: Element): object {
    return this.defaultHandler(element);
  }
}
