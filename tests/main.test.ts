import { Builder } from '../lib/main';
import TestHandler from './testHandler';

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const element = Builder.elementFromXML('<layit><h><h><View></View></h><v><h><View></View></h></v></h></layit>');
  expect(builder.build(element)).toEqual({
    H: [
      {
        H: [
          {
            VIEW: [],
          },
        ],
      },
      {
        V: [
          {
            H: [
              {
                VIEW: [],
              },
            ],
          },
        ],
      },
    ],
  });
});
