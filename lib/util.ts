import { XMLSerializer } from 'xmldom';

export function outerXML(element: Element): string {
  return (new XMLSerializer()).serializeToString(element);
}
