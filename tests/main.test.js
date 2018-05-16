const { Builder } = require('..');
const TestHandler = require('./testHandler');

test('Test handler: plain text child', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  const doc = Builder.documentFromXML('<layit><h><h><view></view></h><v><h><view></view></h></v></h></layit>');
  expect(builder.build(doc)).toEqual({
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

test('Invalid parameter', () => {
  const handler = new TestHandler();
  const builder = new Builder(handler);
  expect(() => builder.build('<a></a>')).toThrow();
});
