import Context from './context';

export default class Handler {
  handleElement(_ctx: Context): any {
    throw new Error('Not implemented yet');
  }

  throwNotSupportedTagName(tagName: string) {
    throw new Error(`The tag "${tagName}" is not supported`);
  }
}
