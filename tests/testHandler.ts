import { Context, Handler } from '../lib/main';

export default class TestHandler extends Handler {
  handleBuiltin(ctx: Context): object {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }

  handleExternal(ctx: Context): object {
    // tslint:disable-next-line no-any
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }

  handleRef(_obj: object, _ctx: Context): object {
    throw new Error('Not implemented yet');
  }
}
