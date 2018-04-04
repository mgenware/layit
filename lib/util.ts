import { XMLSerializer } from 'xmldom-alpha-ex';

export function outerXML(element: Element): string {
  return (new XMLSerializer()).serializeToString(element);
}
