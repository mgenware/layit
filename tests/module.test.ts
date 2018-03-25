const main = require('../..');
import * as fs from 'fs';

describe('require this module', () => {
  test('Verify module members', () => {
    expect(typeof main.Builder).toBe('function');
  });

  test('Verify type definition files', () => {
    expect(fs.statSync('./dist/lib/main.d.ts').isFile()).toBeTruthy();
  });
});
