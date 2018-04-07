export function outerXML(element: Element): string {
  return element.outerHTML;
}

export function rootElementFromDocument(document: Document): Element|null {
  return document.body.firstElementChild;
}
