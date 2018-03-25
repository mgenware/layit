import Context from './context';

export default class Handler {
  handleBuiltin(_ctx: Context): object {
    throw new Error('Not implemented yet');
  }

  handleExternal(_ctx: Context): object {
    throw new Error('Not implemented yet');
  }

  handleRef(_ref: object, _ctx: Context): object {
    throw new Error('Not implemented yet');
  }
}
