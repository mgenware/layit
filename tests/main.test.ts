import { Builder } from '../lib/main';
import TestHandler from './testHandler';

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const doc = Builder.documentFromXML('<layit><H><H><view></view></H><V><H><view></view></H></V></H></layit>');
  expect(builder.build(doc)).toEqual({
    'H-b': [
      {
        'H-b': [
          {
            'view-e': [],
          },
        ],
      },
      {
        'V-b': [
          {
            'H-b': [
              {
                'view-e': [],
              },
            ],
          },
        ],
      },
    ],
  });
});
