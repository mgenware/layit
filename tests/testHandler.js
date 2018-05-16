const { Context, Handler } = require('..');

class TestHandler extends Handler {
  handleElement(ctx) {
    const ret = {};
    ret[ctx.tagName] = ctx.childElements.map((c) => ctx.handleDefault(c));
    return ret;
  }
}

module.exports = TestHandler;
