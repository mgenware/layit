import { Builder } from '../lib/main';
import TestHandler from './testHandler';

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const doc = Builder.documentFromXML('<layit><h><h><View></View></h><v><h><View></View></h></v></h></layit>');
  expect(builder.build(doc)).toEqual({
    h: [
      {
        h: [
          {
            View: [],
          },
        ],
      },
      {
        v: [
          {
            h: [
              {
                View: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
