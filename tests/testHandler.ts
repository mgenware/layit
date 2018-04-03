import { Context, Handler } from '../lib/main';

export default class TestHandler extends Handler {
  handleBuiltin(ctx: Context): object {
    const ret = {} as any;
    ret[ctx.tagName + '-b'] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }

  handleExternal(ctx: Context): object {
    const ret = {} as any;
    ret[ctx.tagName + '-e'] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }
}
