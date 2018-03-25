import Context from './context';

export default class Handler {
  handleBuiltin(ctx: Context): object {
    throw new Error('Not implemented yet');
  }

  handleExternal(ctx: Context): object {
    throw new Error('Not implemented yet');
  }

  handleRef(obj: object, ctx: Context): object {
    throw new Error('Not implemented yet');
  }
}
