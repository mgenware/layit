import { Context, Handler } from '../lib/main';

export default class TestHandler extends Handler {
  handleElement(ctx: Context): object {
    const ret = {} as any;
    ret[ctx.tagName] = ctx.children.map((c) => ctx.handleDefault(c));
    return ret;
  }
}
