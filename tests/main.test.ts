import { Builder } from '../lib/main';
import TestHandler from './testHandler';

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const element = Builder.elementFromXML('<h><view></view></h>');
  expect(builder.build(element)).toEqual([{v: [{View: {}}]}]);
});
