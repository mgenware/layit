import { Builder } from '../lib/main';
import TestHandler from './testHandler';

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const element = Builder.elementFromXML('<h>a &lt;</h>');
  expect(builder.build(element)).toEqual([{v: 'a <'}]);
});
